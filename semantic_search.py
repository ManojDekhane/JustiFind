from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from sentence_transformers.util import cos_sim
import requests


# ==========================================================
# 1. Load your dataset
# ==========================================================
df = pd.read_csv(
   "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CrimesAgainstPersonsLawsDataset.csv",
    sep=',',
    quotechar='"',
    engine='python',
    on_bad_lines='skip'
)

# Combine fields into one string for embeddings
df["text_for_embedding"] = (
    "Section " + df["Section"].astype(str) + ". " +
    df["Title"].fillna("").astype(str) + ". " +
    df["Description"].fillna("").astype(str) + ". " +
    df["Example Queries"].fillna("").astype(str) + ". " +
    df["Keywords"].fillna("").astype(str)
)

# Cleaner text (for AI explanation)
df["text_clean"] = (
    "Section " + df["Section"].astype(str) + " - " +
    df["Title"].fillna("").astype(str) + ". " +
    df["Description"].fillna("").astype(str)
)


# ==========================================================
# 2. Load a sentence transformer model
# ==========================================================
# Faster but slightly less accurate: "all-MiniLM-L6-v2"
# Better semantic accuracy: "all-mpnet-base-v2"
# model = SentenceTransformer("all-mpnet-base-v2")
model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

# Generate embeddings + normalize
law_embeddings = model.encode(
    df["text_for_embedding"].tolist(),
    convert_to_tensor=True,
    show_progress_bar=True
)
law_embeddings = util.normalize_embeddings(law_embeddings)


# ==========================================================
# 3. Semantic search function
# ==========================================================
def semantic_search(query, top_k=3):
    query_embedding = model.encode([query], convert_to_tensor=True)
    query_embedding = util.normalize_embeddings(query_embedding)

    scores = cos_sim(query_embedding, law_embeddings)[0]
    scores_np = scores.cpu().numpy()
    top_indices = scores_np.argsort()[-top_k:][::-1]

    results = []
    for idx in top_indices:
        results.append({
            "section": str(df.iloc[idx]["Section"]),
            "title": df.iloc[idx]["Title"],
            "description": df.iloc[idx]["Description"],
            "score": float(scores[idx])
        })
    return results


# ==========================================================
# 4. Re-rank function (keyword overlap)
# ==========================================================
def re_rank_results(query, results):
    q_tokens = set(query.lower().split())
    best = results[0]
    best_overlap = 0

    for r in results:
        law_tokens = set(str(r["description"]).lower().split() + str(r["title"]).lower().split())
        overlap = len(q_tokens.intersection(law_tokens))
        if overlap > best_overlap:
            best_overlap = overlap
            best = r
    return best


# ==========================================================
# 5. AI explanation (Groq API)
# ==========================================================
def generate_user_friendly_text(law_text, user_query):
    GROQ_API_KEY =  "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"  # Replace with your API key
    groq_api_url = "https://api.groq.com/openai/v1/chat/completions"

    prompt = f"""
You are a legal assistant for everyday people. 
Explain the given law in very simple, plain language so that someone without legal knowledge can easily understand it. 
First show section and title (not description). Then:
- What the law is about
- What kind of behavior it covers
- What a person should do to stay safe / prevent issues
- Practical precautions and advice
- Friendly, easy-to-read tone

Law: {law_text}
User question: {user_query}
"""

    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 500
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }

    try:
        response = requests.post(groq_api_url, json=payload, headers=headers, timeout=60)
        response.raise_for_status()
        data = response.json()
        explanation = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return explanation or "No explanation returned."
    except requests.exceptions.RequestException as e:
        return f"AI service not reachable: {str(e)}"


# ==========================================================
# 6. Flask setup
# ==========================================================
app = Flask(__name__)
CORS(app)


@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query", "")
    top_k = int(data.get("top_k", 3))

    if not query.strip():
        return jsonify({"error": "Query cannot be empty"}), 400

    laws = semantic_search(query, top_k=top_k)
    if not laws:
        return jsonify({"error": "No relevant laws found"}), 404

    best_law = re_rank_results(query, laws)

    law_row = df[df["Section"].astype(str) == best_law["section"]].iloc[0]
    clean_text = f"Section {law_row['Section']} - {law_row['Title']}. {law_row['Description']}"

    ai_text = generate_user_friendly_text(clean_text, query)

    return jsonify({
        "law": {
            "section": best_law["section"],
            "title": best_law["title"],
            "description": best_law["description"],
            "score": best_law["score"]
        },
        "ai_response": ai_text
    })


# ==========================================================
# 7. Run server
# ==========================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
