from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim
import requests


# 1. Load your dataset

df = pd.read_csv(
   "C:\\Users\\Shivani Katkar\\Downloads\\CrimesAgainstPersonsLawsDataset.csv",
    sep=',',               # comma-separated
    quotechar='"',         # handle quoted text properly
    engine='python',       # more flexible parser
    on_bad_lines='skip'    # skip malformed lines
)



# Combine useful fields for embeddings

df["text_for_embedding"] = (
    "IPC " + df["Section"].astype(str) + ". " +
    df["Title"].astype(str) + ". " +
    df["Description"].astype(str) + ". " +
    df["Keywords"].astype(str)
    # df["Example Queries"].astype(str)
)

df["text_clean"] = (
    "Section " + df["Section"].astype(str) + " - " +
    df["Title"].astype(str) + ". " +
    df["Description"].astype(str)
)


# 2. Load a sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# model = SentenceTransformer("all-mpnet-base-v2")

# Generate embeddings for all laws
law_embeddings = model.encode(df["text_for_embedding"].tolist(), convert_to_tensor=True)


# --- Initialize Flask ---
app = Flask(__name__)
CORS(app)


# 3. Define semantic search function
def semantic_search(query, top_k=1):
    # Encode query
    query_embedding = model.encode([query], convert_to_tensor=True)
    
    # Compute cosine similarity
    # scores = cosine_similarity(query_embedding.cpu(), law_embeddings.cpu())[0]
    
    scores = cos_sim(query_embedding, law_embeddings)[0]
    
    # Get top-k results
    scores_np = scores.cpu().numpy()
    top_indices = scores_np.argsort()[-top_k:][::-1]
    
    
    results = []
    for idx in top_indices:
        results.append({
            "section": df.iloc[idx]["Section"],
            "title": df.iloc[idx]["Title"],
            "score": float(scores[idx])
        })
    return results

# --- Call Groq AI ---
# def generate_user_friendly_text(law_text, user_query):
#     groq_api_url = "https://api.groq.com/openai/v1/chat/completions"
#     payload = {
#         "prompt": f"Explain this law in simple words for a layperson. Law: {law_text}. User query: {user_query}. Include precautions, preventive steps, and guidelines.",
#         "max_tokens": 500
#     }
#     headers = {
#         "Authorization": "Bearer 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",
#         "Content-Type": "application/json"
#     }
#     response = requests.post(groq_api_url, json=payload, headers=headers)
#     if response.status_code == 200: 
#         return response.json().get("text", "")
#     else: 
#         print(response.status_code, response.text)  # Helpful for debugging
#         return "Error generating explanation from AI."

def generate_user_friendly_text(law_text, user_query):
    GROQ_API_KEY = "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"
    groq_api_url = "https://api.groq.com/openai/v1/chat/completions"
    # prompt = f"Explain this law in simple words for a layperson. Law: {law_text}. User query: {user_query}. Include precautions, preventive steps, and guidelines."
    
    prompt = f"""
You are a legal assistant for everyday people. 
Explain the given law in very simple, plain language so that someone without legal knowledge can easily understand it. 
First display section and title not description then
Focus on:
- What the law is about
- What kind of behavior it covers
- What a person should do to stay safe / prevent issues
- Practical precautions and advice
- Friendly and easy-to-read tone
Do NOT include legal jargon, case citations, or long sections of law text. 
Give short, clear points and examples if needed.

Law: {law_text}
User question: {user_query}
"""


    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"  # replace with your key
    }

    try:
        response = requests.post(groq_api_url, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()
        explanation = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        return explanation or "No explanation returned."
    except requests.exceptions.RequestException as e:
        return f"AI service not reachable: {str(e)}"


# Flask route
@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query", "")
    top_k = int(data.get("top_k", 1))

    if not query.strip():
        return jsonify({"error": "Query cannot be empty"}), 400
    
    # results = semantic_search(query, top_k=top_k)
    # return jsonify({"results": results})

    laws = semantic_search(query, top_k=top_k)
    if not laws:
        return jsonify({"error": "No relevant laws found"}), 404

    # Send law + query to Groq AI
    # law_text = f"{laws[0]['title']} - {laws[0]['description']}"
    # ai_text = generate_user_friendly_text(law_text, query)

    # law_text = df.loc[df["Section"] == laws[0]['section'], "text_clean"].values[0]
    # ai_text = generate_user_friendly_text(law_text, query)


    law_row = df[df["Section"].astype(str) == laws[0]["section"]].iloc[0]
    clean_text = f"Section {law_row['Section']} - {law_row['Title']}. {law_row['Description']}"

    ai_text = generate_user_friendly_text(clean_text, query)


    return jsonify({
    "law": {
        "section": laws[0]['section'],
        "title": laws[0]['title'],
        "description": law_row["Description"]
    },
    "ai_response": ai_text
})

# 4. Example usage
if __name__ == "__main__":
    # query = "Someone killed a person intentionally"
    # results = semantic_search(query, top_k=1)
    
    # for r in results:
    #     print(f"{r['section']} - {r['title']} ({r['score']:.2f})")
    #     print(f"   {r['description']}\n")

    app.run(debug=True, port=5000)