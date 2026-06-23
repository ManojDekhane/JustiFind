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
# import json

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# # ==========================================================
# # CONFIG
# # ==========================================================
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# # ==========================================================
# # LOAD DATA
# # ==========================================================
# df = pd.read_csv(
#     "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
#     sep=",",
#     engine="python",
#     quotechar='"',
#     on_bad_lines="skip"
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

# # ==========================================================
# # MODELS
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
# # QUERY CLASSIFICATION
# # ==========================================================
# def classify_query(query):
#     prompt = f"""
# Classify this legal query into:

# LawType: Constitution / IPC / IT Act / Civil / Labour / Other
# Intent: Right / Crime / Penalty / Restriction / Definition
# Domain: one or two words

# Query: {query}

# Return JSON:
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

#         content = res.json()["choices"][0]["message"]["content"]
#         parsed = json.loads(content)

#         return (
#             parsed.get("LawType", "Other"),
#             parsed.get("Domain", "General"),
#             parsed.get("Intent", "Other")
#         )

#     except:
#         return ("Other", "General", "Other")

# # ==========================================================
# # HYBRID SEARCH
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
# # RERANK
# # ==========================================================
# def rerank(query, candidates):
#     pairs = [(query, c["title"] + " " + c["description"]) for c in candidates]
#     scores = reranker.predict(pairs)

#     ranked = sorted(
#         zip(candidates, scores),
#         key=lambda x: x[1],
#         reverse=True
#     )

#     return ranked  # return ALL ranked results

# # ==========================================================
# # ✅ NEW: AI VALIDATOR
# # ==========================================================
# def validate_result(query, law):
#     prompt = f"""
# User Query: {query}

# Law:
# Title: {law['title']}
# Description: {law['description']}

# Is this law relevant to the query?

# Answer ONLY in JSON:
# {{"relevant": "YES" or "NO"}}
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

#         content = res.json()["choices"][0]["message"]["content"]
#         parsed = json.loads(content)

#         return parsed.get("relevant", "YES") == "YES"

#     except:
#         return True  # fallback safe

# # ==========================================================
# # AI EXPLANATION
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


# def explain_law_simple(title, description):
#     prompt = f"""
# Explain this law in very simple terms for a common person.

# Law Title: {title}
# Description: {description}

# Make the answer:
# - Easy to understand
# - Use bullet points
# - Give a real-life example if possible
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
#                 "temperature": 0.3
#             },
#             timeout=30
#         )

#         return res.json()["choices"][0]["message"]["content"]

#     except:
#         return "Explanation unavailable."

# def find_best_law(query):

#     prompt = f"""
# You are a legal intent classifier.

# Extract keywords from the query.

# Return ONLY JSON:
# {{
#   "keywords": ["kidnapping", "abduction"],
#   "category": "IPC / IT Act / Constitution / Civil / Other"
# }}

# Query: {query}
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

#         content = res.json()["choices"][0]["message"]["content"]
#         parsed = json.loads(content)

#         keywords = parsed.get("keywords", [])

#     except:
#         keywords = query.split()

#     expanded_query = query + " " + " ".join(keywords)

#     query_emb = embed_model.encode([expanded_query], convert_to_tensor=True)
#     query_emb = util.normalize_embeddings(query_emb)

#     scores = util.cos_sim(query_emb, law_embeddings)[0].cpu().numpy()

#     top_idx = np.argsort(scores)[-1]  # BEST ONLY

#     row = df.iloc[top_idx]

#     return {
#         "index": int(top_idx),
#         "section": str(row["Section"]),
#         "title": row["Title"],
#         "description": row["Description"]
#     }
# def explain_law(query, law):

#     prompt = f"""
# You are a legal assistant explaining Indian laws in simple language.

# USER QUESTION:
# {query}

# LAW:
# Title: {law['title']}
# Description: {law['description']}

# FORMAT:
# 📌 Meaning:
# ⚖️ Explanation:
# 🚨 Real-life Example:
# 🧠 Why this law exists:

# Rules:
# - Very simple English
# - No legal jargon
# - Short and clear
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
#                 "temperature": 0.3
#             },
#             timeout=30
#         )

#         return res.json()["choices"][0]["message"]["content"]

#     except:
#         return "Explanation unavailable."
# # ==========================================================
# # SEARCH API
# # ==========================================================
# # @app.route("/search", methods=["POST"])
# # def search():

# #     data = request.json
# #     query = data.get("query", "").strip()

# #     if not query:
# #         return jsonify({"error": "Empty query"}), 400

# #     # STEP 1: FIND BEST LAW
# #     best_law = find_best_law(query)

# #     # STEP 2: CLEAN LAW OBJECT
# #     law_obj = {
# #         "title": best_law["title"],
# #         "description": best_law["description"],
# #         "section": best_law["section"]
# #     }

# #     # STEP 3: EXPLANATION
# #     explanation = explain_law(query, law_obj)

# #     # STEP 4: RESPONSE
# #     return jsonify({
# #         "law": law_obj,
# #         "ai_response": explanation
# #     })


# @app.route("/search", methods=["POST"])
# def search():
#     data = request.json
#     query = data.get("query", "").strip()

#     if not query:
#         return jsonify({"error": "Empty query"}), 400

#     prompt = f"""
# You are an expert Indian legal assistant.

# A user will ask a legal question.
# You must return the MOST relevant law in India.

# USER QUERY:
# {query}

# Return ONLY valid JSON (no extra text):

# {{
#   "law": {{
#     "section": "IPC/IT Act/Civil section number if applicable",
#     "title": "Exact law title",
#     "description": "Clear legal explanation of the law in 2-4 lines"
#   }},
#   "ai_response": "Explain the law in simple human language with:
#   - Meaning
#   - When it applies
#   - Real-life example"
# }}

# Rules:
# - Be accurate as possible
# - If unsure, still return closest relevant law
# - Keep language simple
# -give detailed explantion in easy words in thoery
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
#                 "messages": [
#                     {"role": "user", "content": prompt}
#                 ],
#                 "temperature": 0.2
#             },
#             timeout=30
#         )

#         content = res.json()["choices"][0]["message"]["content"]

#         content = content.strip()

#         if "```" in content:
#             content = content.replace("```json", "").replace("```", "")

#         parsed = json.loads(content)


#         return jsonify(parsed)

#     except Exception as e:
#         return jsonify({
#             "error": "Failed to process query",
#             "details": str(e)
#         }), 500

# # ==========================================================
# # LAWYERS API
# # ==========================================================
# # lawyers = [
# #     {"name": "Amit Sharma", "lat": 18.5204, "lon": 73.8567},
# #     {"name": "Priya Desai", "lat": 19.0760, "lon": 72.8777},
# # ]

# @app.route("/lawyers", methods=["GET"])
# # def get_lawyers():
# #     lat = float(request.args.get("lat"))
# #     lon = float(request.args.get("lon"))

# #     user_loc = (lat, lon)

# #     for l in lawyers:
# #         l["distance"] = geodesic(user_loc, (l["lat"], l["lon"])).km

# #     return jsonify(sorted(lawyers, key=lambda x: x["distance"]))


# @app.route("/explain-law", methods=["POST"])
# def explain_law(query, best_law):

#     data = request.json
#     title = data.get("title", "")
#     description = data.get("description", "")

#     if not description:
#         return jsonify({"error": "No law data provided"}), 400

#     explanation = explain_law_simple(title, description)

#     return jsonify({
#         "explanation": explanation
#     })


# # ==========================================================
# # RUN
# # ==========================================================
# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load API key from .env
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# ==========================================
# GROQ AI BRAIN FUNCTION
# ==========================================

def get_legal_response(user_query):

    prompt = f"""
You are an expert Indian legal assistant.

User question:
{user_query}

Return data EXACTLY in this JSON structure:

{{
  "law": {{
      "section":"IPC/IT Act section number",
      "title":"Exact law title",
      "description":"2-3 line description"
  }},
  "ai_response":"📌 Meaning:\\n• point\\n\\n⚖️ When it applies:\\n• point\\n• point\\n\\n🚨 Real-life example:\\n• point\\n\\n🧠 Why this law exists:\\n• point\\n\\n👉 Important:\\n• point"
}}

Rules:
- Return only JSON
- No markdown
- No backticks
- Escape line breaks using \\n
- ai_response must be a single string

For ai_response use:

📌 Meaning:
• point

⚖️ When it applies:
• point
• point

🚨 Real-life example:
• point

🧠 Why this law exists:
• point

👉 Important:
• point
"""

    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2,
            "response_format": {"type": "json_object"}
        },
        timeout=30
    )

    content = response.json()["choices"][0]["message"]["content"]

    try:
        return json.loads(content)

    except Exception as e:
        print("JSON parse error:", e)
        print("Raw AI output:", content)

        return {
            "law": {
                "section": "N/A",
                "title": "Could not determine law",
                "description": "AI returned invalid format"
            },
            "ai_response": content
        }


# ==========================================
# API
# ==========================================
@app.route("/search", methods=["POST"])
def search():

    data = request.json
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error":"Empty query"}), 400

    try:
        result = get_legal_response(query)
        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error":"Something went wrong",
            "details":str(e)
        }), 500


# ==========================================
# RUN
# ==========================================
if __name__ == "__main__":
    app.run(debug=True)