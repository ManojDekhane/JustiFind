from sentence_transformers import SentenceTransformer
import pandas as pd
from flask import Flask, request, jsonify
from sentence_transformers.util import cos_sim

# 1. Load your dataset

df = pd.read_csv(
    "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
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
    df["Keywords"].astype(str) + ". " +
    df["Example Queries"].astype(str)
)

# 2. Load a sentence transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# model = SentenceTransformer("all-mpnet-base-v2")

# Generate embeddings for all laws
law_embeddings = model.encode(df["text_for_embedding"].tolist(), convert_to_tensor=True)

app = Flask(__name__)

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
            "description": str(df.iloc[idx]["Description"]),
            "score": float(scores[idx])
        })
    return results

# Flask route
@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query", "")
    top_k = int(data.get("top_k", 1))

    if not query.strip():
        return jsonify({"error": "Query cannot be empty"}), 400
    
    results = semantic_search(query, top_k=top_k)
    return jsonify({"results": results})

# 4. Example usage
if __name__ == "__main__":
    # query = "Someone killed a person intentionally"
    # results = semantic_search(query, top_k=1)
    
    # for r in results:
    #     print(f"{r['section']} - {r['title']} ({r['score']:.2f})")
    #     print(f"   {r['description']}\n")

    app.run(debug=True, port=5000)
