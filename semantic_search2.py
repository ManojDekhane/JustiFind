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

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# ==========================================================
# LOAD DATA
# ==========================================================
df = pd.read_csv(
    "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
    engine="python",
    on_bad_lines="warn"
)

df.fillna("", inplace=True)

df["text_for_embedding"] = (
    df["LawType"] + ". " +
    df["Domain"] + ". " +
    df["Intent"] + ". " +
    df["Title"] + ". " +
    df["Description"] + ". " +
    df["Example Queries"] + ". " +
    df["Keywords"]
)

# ==========================================================
# MODELS
# ==========================================================
embed_model = SentenceTransformer("all-mpnet-base-v2")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

law_embeddings = util.normalize_embeddings(
    embed_model.encode(df["text_for_embedding"].tolist(), convert_to_tensor=True)
)

tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df["text_for_embedding"])

# ==========================================================
# 🔥 1. LEGAL ROUTER (NEW)
# ==========================================================
def route_query(query):

    prompt = f"""
Classify legal domain:

Choose ONE:
IPC, CIVIL, LABOUR, CONSTITUTION, IT_ACT, OTHER

Query:
{query}

Return JSON:
{{"route": "..."}}
"""

    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0
            }
        )

        content = res.json()["choices"][0]["message"]["content"]
        return json.loads(content).get("route", "OTHER")

    except:
        return "OTHER"

# ==========================================================
# 🔥 2. INTENT CLASSIFIER (NEW)
# ==========================================================
def intent_classifier(query):

    prompt = f"""
Classify intent:

Options:
COMPLAINT, INFORMATION, RIGHTS, PROCEDURE, PUNISHMENT

Query:
{query}

Return JSON:
{{"intent": "..."}}
"""

    try:
        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0
            }
        )

        content = res.json()["choices"][0]["message"]["content"]
        return json.loads(content).get("intent", "INFORMATION")

    except:
        return "INFORMATION"

# ==========================================================
# HYBRID SEARCH (IMPROVED)
# ==========================================================
def hybrid_search(query, filtered_df, intent):

    idx = filtered_df.index.tolist()

    q_emb = util.normalize_embeddings(
        embed_model.encode([query], convert_to_tensor=True)
    )

    sem = util.cos_sim(q_emb, law_embeddings[idx])[0].cpu().numpy()

    tfidf_q = tfidf.transform([query])
    kw = (tfidf_q @ tfidf_matrix[idx].T).toarray()[0]

    # 🔥 intent boost
    intent_boost = np.array([
        0.1 if intent.lower() in str(df.iloc[i]["Intent"]).lower() else 0
        for i in idx
    ])

    scores = 0.6 * sem + 0.3 * kw + 0.1 * intent_boost

    top = np.argsort(scores)[-5:][::-1]

    results = []
    for i in top:
        row = filtered_df.iloc[i]
        results.append({
            "index": idx[i],
            "section": row["Section"],
            "title": row["Title"],
            "description": row["Description"],
            "score": float(scores[i])
        })

    return results

# ==========================================================
# RERANK
# ==========================================================
def rerank(query, candidates):

    pairs = [(query, c["title"] + " " + c["description"]) for c in candidates]
    scores = reranker.predict(pairs)

    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    return ranked

# ==========================================================
# SEARCH API
# ==========================================================
@app.route("/search", methods=["POST"])
def search():

    query = request.json.get("query", "").strip()
    if not query:
        return jsonify({"error": "empty query"}), 400

    # 🔥 STEP 1: ROUTE
    route = route_query(query)

    # 🔥 STEP 2: INTENT
    intent = intent_classifier(query)

    # 🔥 STEP 3: FILTER (STRONGER)
    filtered_df = df[df["LawType"].str.contains(route, case=False, na=False)]

    if len(filtered_df) < 5:
        filtered_df = df

    # 🔥 STEP 4: SEARCH
    candidates = hybrid_search(query, filtered_df, intent)

    # 🔥 STEP 5: RERANK
    ranked = rerank(query, candidates)

    best, score = ranked[0]

    # 🔥 SECTION BOOST FIX
    if query.lower() in str(best["section"]).lower():
        score += 0.2

    # 🔥 EXPLANATION
    row = df.iloc[best["index"]]
    text = f"{row['Section']} - {row['Title']}. {row['Description']}"

    explanation = "Explain: " + text

    return jsonify({
        "law": best,
        "confidence": float(score),
        "classification": {
            "route": route,
            "intent": intent
        },
        "ai_response": explanation
    })

# ==========================================================
# RUN
# ==========================================================
if __name__ == "__main__":
    app.run(debug=True)