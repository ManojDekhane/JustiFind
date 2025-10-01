import pandas as pd
from sentence_transformers import SentenceTransformer
# from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers.util import cos_sim

# 1. Load your dataset

df = pd.read_csv(
    "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv",
    sep=',',               # comma-separated
    quotechar='"',         # handle quoted text properly
    engine='python',       # more flexible parser
    on_bad_lines='skip'    # skip malformed lines
)
# replace with your file path

# Combine useful fields for embeddings
# df["text_for_embedding"] = (
#     df["Title"].astype(str) + ". " +
#     df["Description"].astype(str) + ". " +
#     df["Keywords"].astype(str) + ". " +
#     df["Example Queries"].astype(str)
# )

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

# 3. Define semantic search function
# def semantic_search(query, top_k=3):
#     # Encode query
#     query_embedding = model.encode([query], convert_to_tensor=True)
    
#     # Compute cosine similarity
#     scores = cosine_similarity(query_embedding.cpu(), law_embeddings.cpu())[0]
    
#     # Get top-k results
#     top_indices = scores.argsort()[-top_k:][::-1]
    
#     results = []
#     for idx in top_indices:
#         results.append({
#             "section": df.loc[idx, "Section"],
#             "title": df.loc[idx, "Title"],
#             "description": df.loc[idx, "Description"],
#             "score": float(scores[idx])
#         })
#     return results

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
            "description": df.iloc[idx]["Description"],
            "score": float(scores[idx])
        })
    return results


# 4. Example usage
if __name__ == "__main__":
    query = "Someone killed a person intentionally"
    results = semantic_search(query, top_k=1)
    
    for r in results:
        print(f"{r['section']} - {r['title']} ({r['score']:.2f})")
        print(f"   {r['description']}\n")
