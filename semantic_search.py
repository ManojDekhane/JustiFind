# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sentence_transformers import SentenceTransformer, util, CrossEncoder
# from sklearn.feature_extraction.text import TfidfVectorizer
# import requests
# import os
# from geopy.distance import geodesic
# from dotenv import load_dotenv
# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# # ==========================================================
# # CONFIG
# # ==========================================================
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# # ==========================================================
# # 1. LOAD DATA
# # ==========================================================
# df = pd.read_csv(
#     "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
#     sep=",",
#     engine="python",
#     quotechar='"',
#     on_bad_lines="warn"
# )

# df.fillna("", inplace=True)

# print("Loaded rows:", len(df))

# df["text_for_embedding"] = (
#     "Law Type: " + df["LawType"] + ". " +
#     "Domain: " + df["Domain"] + ". " +
#     "Intent: " + df["Intent"] + ". " +
#     "Title: " + df["Title"] + ". " +
#     "Description: " + df["Description"] + ". " +
#     "Examples: " + df["Example Queries"] + ". " +
#     "Keywords: " + df["Keywords"]
# )

# df["text_clean"] = (
#     df["Section"].astype(str) + " - " +
#     df["Title"] + ". " +
#     df["Description"]
# )

# # ==========================================================
# # 2. MODELS
# # ==========================================================
# embed_model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
# reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

# law_embeddings = embed_model.encode(
#     df["text_for_embedding"].tolist(),
#     convert_to_tensor=True
# )
# law_embeddings = util.normalize_embeddings(law_embeddings)

# tfidf = TfidfVectorizer(stop_words="english")
# tfidf_matrix = tfidf.fit_transform(df["text_for_embedding"])

# # ==========================================================
# # 3. QUERY CLASSIFICATION
# # ==========================================================
# def classify_query(query):
#     prompt = f"""
# Classify this legal query into:

# LawType: Constitution / IPC / IT Act / Civil / Labour / Other
# Intent: Right / Crime / Penalty / Restriction / Definition
# Domain: one or two words

# Query: {query}

# Return JSON like:
# {{"LawType": "...", "Domain": "...", "Intent": "..."}}
# """

#     try:
#         res = requests.post(
#             "https://api.groq.com/openai/v1/chat/completions",
#             headers={
#                 "Authorization": f"Bearer {GROQ_API_KEY}",
#                 "Content-Type": "application/json"
#             },
#             json={
#                 "model": "meta-llama/llama-4-scout-17b-16e-instruct",
#                 "messages": [{"role": "user", "content": prompt}],
#                 "temperature": 0
#             },
#             timeout=20
#         )

#         data = res.json()
#         content = data["choices"][0]["message"]["content"]

#         import json
#         parsed = json.loads(content)

#         return (
#             parsed.get("LawType", "Other"),
#             parsed.get("Domain", "General"),
#             parsed.get("Intent", "Other")
#         )

#     except:
#         return ("Other", "General", "Other")

# # ==========================================================
# # 4. HYBRID SEARCH
# # ==========================================================
# def hybrid_search(query, filtered_df, top_k=5):

#     indices = filtered_df.index.tolist()

#     query_emb = embed_model.encode([query], convert_to_tensor=True)
#     query_emb = util.normalize_embeddings(query_emb)

#     sem_scores = util.cos_sim(query_emb, law_embeddings[indices])[0].cpu().numpy()

#     tfidf_query = tfidf.transform([query])
#     keyword_scores = (tfidf_query @ tfidf_matrix[indices].T).toarray()[0]

#     final_scores = 0.7 * sem_scores + 0.3 * keyword_scores

#     top_idx = np.argsort(final_scores)[-top_k:][::-1]

#     results = []
#     for i in top_idx:
#         row = filtered_df.iloc[i]
#         results.append({
#             "index": indices[i],
#             "section": str(row["Section"]),
#             "title": row["Title"],
#             "description": row["Description"],
#             "score": float(final_scores[i])
#         })

#     return results

# # ==========================================================
# # 5. RERANK
# # ==========================================================
# def rerank(query, candidates):
#     pairs = [(query, c["title"] + " " + c["description"]) for c in candidates]
#     scores = reranker.predict(pairs)

#     best_idx = int(np.argmax(scores))
#     return candidates[best_idx], float(scores[best_idx])

# # ==========================================================
# # 6. AI EXPLANATION
# # ==========================================================
# def generate_explanation(text, query):
#     try:
#         res = requests.post(
#             "https://api.groq.com/openai/v1/chat/completions",
#             headers={
#                 "Authorization": f"Bearer {GROQ_API_KEY}",
#                 "Content-Type": "application/json"
#             },
#             json={
#                 "model": "meta-llama/llama-4-scout-17b-16e-instruct",
#                 "messages": [{
#                     "role": "user",
#                     "content": f"Explain in simple language:\n{text}\nUser question: {query}"
#                 }]
#             },
#             timeout=30
#         )

#         return res.json()["choices"][0]["message"]["content"]

#     except:
#         return "Explanation unavailable."

# # ==========================================================
# # 7. SEARCH API
# # ==========================================================
# @app.route("/search", methods=["POST"])
# def search():

#     data = request.json
#     query = data.get("query", "").strip()

#     if not query:
#         return jsonify({"error": "Empty query"}), 400

#     # STEP 1: CLASSIFY
#     predicted_lawtype, predicted_domain, predicted_intent = classify_query(query)

#     # STEP 2: FILTER
#     filtered_df = df[
#         (df["LawType"].str.contains(predicted_lawtype, case=False, na=False)) |
#         (df["Domain"].str.contains(predicted_domain, case=False, na=False))
#     ]

#     if len(filtered_df) < 5:
#         filtered_df = df

#     # STEP 3: SEARCH
#     candidates = hybrid_search(query, filtered_df)

#     # STEP 4: RERANK
#     best, confidence = rerank(query, candidates)

#     # STEP 5: HANDLE LOW CONFIDENCE (NO BREAK)
#     warning_note = ""
#     if confidence < 0.4:
#         warning_note = " (Closest match found, please verify.)"

#     # STEP 6: EXPLANATION
#     law_row = df.iloc[best["index"]]
#     clean_text = f"Section {law_row['Section']} - {law_row['Title']}. {law_row['Description']}"

#     explanation = generate_explanation(clean_text, query)
#     explanation = explanation + warning_note

#     # STEP 7: RESPONSE (CONSISTENT FORMAT)
#     return jsonify({
#         "law": {
#             "section": best.get("section", ""),
#             "title": best.get("title", "Relevant Law"),
#             "description": best.get("description", ""),
#             "score": float(confidence)
#         },
#         "ai_response": explanation,
#         "classification": {
#             "LawType": predicted_lawtype,
#             "Domain": predicted_domain,
#             "Intent": predicted_intent
#         }
#     })

# # ==========================================================
# # 8. LAWYERS API
# # ==========================================================
# lawyers = [
#     {"name": "Amit Sharma", "lat": 18.5204, "lon": 73.8567},
#     {"name": "Priya Desai", "lat": 19.0760, "lon": 72.8777},
# ]

# @app.route("/lawyers", methods=["GET"])
# def get_lawyers():
#     lat = float(request.args.get("lat"))
#     lon = float(request.args.get("lon"))

#     user_loc = (lat, lon)

#     for l in lawyers:
#         l["distance"] = geodesic(user_loc, (l["lat"], l["lon"])).km

#     return jsonify(sorted(lawyers, key=lambda x: x["distance"]))

# # ==========================================================
# # RUN
# # ==========================================================
# if __name__ == "__main__":
#     app.run(debug=True)















from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util, CrossEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import requests
import os
from geopy.distance import geodesic
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# ==========================================================
# CONFIG
# ==========================================================
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# ==========================================================
# LOAD DATA
# ==========================================================
df = pd.read_csv(
    "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
    sep=",",
    engine="python",
    quotechar='"',
    on_bad_lines="warn"
)

df.fillna("", inplace=True)

print("Loaded rows:", len(df))

df["text_for_embedding"] = (
    "Law Type: " + df["LawType"] + ". " +
    "Domain: " + df["Domain"] + ". " +
    "Intent: " + df["Intent"] + ". " +
    "Title: " + df["Title"] + ". " +
    "Description: " + df["Description"] + ". " +
    "Examples: " + df["Example Queries"] + ". " +
    "Keywords: " + df["Keywords"]
)

# ==========================================================
# MODELS
# ==========================================================
embed_model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

law_embeddings = embed_model.encode(
    df["text_for_embedding"].tolist(),
    convert_to_tensor=True
)
law_embeddings = util.normalize_embeddings(law_embeddings)

tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df["text_for_embedding"])

# ==========================================================
# QUERY CLASSIFICATION
# ==========================================================
def classify_query(query):
    prompt = f"""
Classify this legal query into:

LawType: Constitution / IPC / IT Act / Civil / Labour / Other
Intent: Right / Crime / Penalty / Restriction / Definition
Domain: one or two words

Query: {query}

Return JSON:
{{"LawType": "...", "Domain": "...", "Intent": "..."}}
"""

    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0
            },
            timeout=20
        )

        content = res.json()["choices"][0]["message"]["content"]
        parsed = json.loads(content)

        return (
            parsed.get("LawType", "Other"),
            parsed.get("Domain", "General"),
            parsed.get("Intent", "Other")
        )

    except:
        return ("Other", "General", "Other")

# ==========================================================
# HYBRID SEARCH
# ==========================================================
def hybrid_search(query, filtered_df, top_k=5):

    indices = filtered_df.index.tolist()

    query_emb = embed_model.encode([query], convert_to_tensor=True)
    query_emb = util.normalize_embeddings(query_emb)

    sem_scores = util.cos_sim(query_emb, law_embeddings[indices])[0].cpu().numpy()

    tfidf_query = tfidf.transform([query])
    keyword_scores = (tfidf_query @ tfidf_matrix[indices].T).toarray()[0]

    final_scores = 0.7 * sem_scores + 0.3 * keyword_scores

    top_idx = np.argsort(final_scores)[-top_k:][::-1]

    results = []
    for i in top_idx:
        row = filtered_df.iloc[i]
        results.append({
            "index": indices[i],
            "section": str(row["Section"]),
            "title": row["Title"],
            "description": row["Description"],
            "score": float(final_scores[i])
        })

    return results

# ==========================================================
# RERANK
# ==========================================================
def rerank(query, candidates):
    pairs = [(query, c["title"] + " " + c["description"]) for c in candidates]
    scores = reranker.predict(pairs)

    ranked = sorted(
        zip(candidates, scores),
        key=lambda x: x[1],
        reverse=True
    )

    return ranked  # return ALL ranked results

# ==========================================================
# ✅ NEW: AI VALIDATOR
# ==========================================================
def validate_result(query, law):
    prompt = f"""
User Query: {query}

Law:
Title: {law['title']}
Description: {law['description']}

Is this law relevant to the query?

Answer ONLY in JSON:
{{"relevant": "YES" or "NO"}}
"""

    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0
            },
            timeout=20
        )

        content = res.json()["choices"][0]["message"]["content"]
        parsed = json.loads(content)

        return parsed.get("relevant", "YES") == "YES"

    except:
        return True  # fallback safe

# ==========================================================
# AI EXPLANATION
# ==========================================================
def generate_explanation(text, query):
    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{
                    "role": "user",
                    "content": f"Explain in simple language:\n{text}\nUser question: {query}"
                }]
            },
            timeout=30
        )

        return res.json()["choices"][0]["message"]["content"]

    except:
        return "Explanation unavailable."


def explain_law_simple(title, description):
    prompt = f"""
Explain this law in very simple terms for a common person.

Law Title: {title}
Description: {description}

Make the answer:
- Easy to understand
- Use bullet points
- Give a real-life example if possible
"""

    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3
            },
            timeout=30
        )

        return res.json()["choices"][0]["message"]["content"]

    except:
        return "Explanation unavailable."
    
# ==========================================================
# SEARCH API
# ==========================================================
@app.route("/search", methods=["POST"])
def search():

    data = request.json
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Empty query"}), 400

    # 1. CLASSIFY
    predicted_lawtype, predicted_domain, predicted_intent = classify_query(query)

    # 2. FILTER
    filtered_df = df[
        (df["LawType"].str.contains(predicted_lawtype, case=False, na=False)) |
        (df["Domain"].str.contains(predicted_domain, case=False, na=False))
    ]

    if len(filtered_df) < 5:
        filtered_df = df

    # 3. SEARCH
    candidates = hybrid_search(query, filtered_df)

    # 4. RERANK (ALL)
    ranked_results = rerank(query, candidates)

    # 5. VALIDATE (TRY TOP RESULTS)
    best = None
    confidence = 0

    for candidate, score in ranked_results:
        if validate_result(query, candidate):
            best = candidate
            # confidence = float(score)
            confidence = float(score.item()) if hasattr(score, "item") else float(score)
            break

    # fallback if none validated
    if not best:
        best, confidence = ranked_results[0]

    # 6. EXPLANATION
    law_row = df.iloc[best["index"]]
    clean_text = f"Section {law_row['Section']} - {law_row['Title']}. {law_row['Description']}"

    explanation = generate_explanation(clean_text, query)

    # 7. RESPONSE
    return jsonify({
        "law": {
            "section": best.get("section", ""),
            "title": best.get("title", "Relevant Law"),
            "description": best.get("description", ""),
            # "score": confidence
            "score": float(confidence)
        },
        "ai_response": explanation,
        "classification": {
            "LawType": predicted_lawtype,
            "Domain": predicted_domain,
            "Intent": predicted_intent
        }
    })

# ==========================================================
# LAWYERS API
# ==========================================================
lawyers = [
    {"name": "Amit Sharma", "lat": 18.5204, "lon": 73.8567},
    {"name": "Priya Desai", "lat": 19.0760, "lon": 72.8777},
]

@app.route("/lawyers", methods=["GET"])
def get_lawyers():
    lat = float(request.args.get("lat"))
    lon = float(request.args.get("lon"))

    user_loc = (lat, lon)

    for l in lawyers:
        l["distance"] = geodesic(user_loc, (l["lat"], l["lon"])).km

    return jsonify(sorted(lawyers, key=lambda x: x["distance"]))


@app.route("/explain-law", methods=["POST"])
def explain_law():

    data = request.json
    title = data.get("title", "")
    description = data.get("description", "")

    if not description:
        return jsonify({"error": "No law data provided"}), 400

    explanation = explain_law_simple(title, description)

    return jsonify({
        "explanation": explanation
    })


# ==========================================================
# RUN
# ==========================================================
if __name__ == "__main__":
    app.run(debug=True)