from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util, CrossEncoder
from rank_bm25 import BM25Okapi
import requests
import os
import json
from geopy.distance import geodesic
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# ======================== LOAD DATA ========================
CSV_PATH = "/home/manoj/Downloads/CrimesAgainstPersonsLawsDataset.csv"   # update if needed

df = pd.read_csv(CSV_PATH, on_bad_lines='skip')
df.fillna("", inplace=True)

df["text_for_embedding"] = (
    "LawType: " + df["LawType"] + ". " +
    "Domain: " + df["Domain"] + ". " +
    "Intent: " + df["Intent"] + ". " +
    "Title: " + df["Title"] + ". " +
    "Description: " + df["Description"] + ". " +
    "Examples: " + df["Example Queries"] + ". " +
    "Keywords: " + df["Keywords"]
)

print("Rows loaded:", len(df))

# ======================== MODELS ========================

embed_model = SentenceTransformer("law-ai/InLegalBERT")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

law_embeddings = embed_model.encode(
    df["text_for_embedding"].tolist(),
    convert_to_tensor=True
)
law_embeddings = util.normalize_embeddings(law_embeddings)

tokenized_corpus = [
    x.lower().split()
    for x in df["text_for_embedding"]
]

bm25 = BM25Okapi(tokenized_corpus)

# ======================== HELPERS ========================

def normalize(scores):
    scores=np.array(scores)

    if scores.max()==scores.min():
        return scores

    return (scores-scores.min())/(scores.max()-scores.min())

def classify_query(query):

    prompt = f"""
Return ONLY valid JSON. No explanation. No markdown.

Format:
{{"LawType":"...","Domain":"...","Intent":"..."}}

Query: {query}
"""

    try:
        r=requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization":f"Bearer {GROQ_API_KEY}",
                "Content-Type":"application/json"
            },
            json={
                "model":"meta-llama/llama-4-scout-17b-16e-instruct",
                "messages":[{"role":"user","content":prompt}],
                "temperature":0
            }
        )

        content = r.json()["choices"][0]["message"]["content"]

# remove markdown fences if present
        content = content.replace("```json", "").replace("```", "").strip()

        data = json.loads(content)

        print("CLASSIFY RAW:", r.json()["choices"][0]["message"]["content"])

        return (
            data.get("LawType","Other"),
            data.get("Domain","General"),
            data.get("Intent","Other")
        )

    except:
        return ("Other","General","Other")


def expand_query(query):

    prompt=f"""
Expand legal query into related keywords only.

Query:{query}
"""

    try:
        r=requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization":f"Bearer {GROQ_API_KEY}",
                "Content-Type":"application/json"
            },
            json={
                "model":"meta-llama/llama-4-scout-17b-16e-instruct",
                "messages":[{"role":"user","content":prompt}],
                "temperature":0.2
            }
        )

        # expanded=r.json()["choices"][0]["message"]["content"]
        expanded = query
        return query+" "+expanded

    except:
        return query


def hybrid_search(query, lawtype, domain, top_k=20):

    query="Represent this legal search query: "+query

    query_emb=embed_model.encode(
        [query],
        convert_to_tensor=True
    )

    query_emb=util.normalize_embeddings(query_emb)

    sem_scores=util.cos_sim(
        query_emb,
        law_embeddings
    )[0].cpu().numpy()

    keyword_scores=np.array(
        bm25.get_scores(
            query.lower().split()
        )
    )

    sem_scores=normalize(sem_scores)
    keyword_scores=normalize(keyword_scores)

    bonus=[]

    for _,row in df.iterrows():

        b=0

        if lawtype.lower() in row["LawType"].lower():
            b+=0.15

        if domain.lower() in row["Domain"].lower():
            b+=0.15

        bonus.append(b)

    bonus=np.array(bonus)

    final_scores=(
        0.6*sem_scores
        +0.25*keyword_scores
        +0.15*bonus
    )

    top_idx=np.argsort(final_scores)[-top_k:][::-1]

    results=[]

    for i in top_idx:

        row=df.iloc[i]

        results.append({
            "index":i,
            "section":str(row["Section"]),
            "title":row["Title"],
            "description":row["Description"],
            "score":float(final_scores[i])
        })

    return results

# def generate_explanation(title, description, query):
#     prompt = f"""
# Explain this law in simple terms.

# Law Title: {title}
# Description: {description}

# User Query: {query}

# Requirements:
# - simple English
# - bullet points
# - real-life example
# """

#     try:
#         r = requests.post(
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

#         return r.json()["choices"][0]["message"]["content"]

#     except:
#         return "Explanation unavailable."


def generate_explanation(title, description, query):

    prompt = f"""
Explain this law in simple terms.

Law Title: {title}
Description: {description}

User Query: {query}

Requirements:
- simple English
- bullet points
- real-life example
"""

    try:

        r = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "meta-llama/llama-4-scout-17b-16e-instruct",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": 0.3
            },
            timeout=30
        )


        print("GROQ STATUS:", r.status_code)
        print("GROQ RESPONSE:", r.text)


        data = r.json()

        return data["choices"][0]["message"]["content"]


    except Exception as e:

        print("EXPLANATION ERROR:", e)

        return "Explanation unavailable."


@app.route("/explain-law", methods=["POST"])
def explain_law():

    data = request.json

    title = data.get("title", "")
    description = data.get("description", "")

    if not description:
        return jsonify({
            "error": "No law data provided"
        }), 400


    explanation = generate_explanation(
        title,
        description,
        "Explain this law"
    )


    return jsonify({
        "explanation": explanation
    })



def rerank(query,candidates):

    pairs=[
        (
            query,
            x["title"]+" "+x["description"]
        )
        for x in candidates
    ]

    scores=reranker.predict(pairs)

    ranked=sorted(
        zip(candidates,scores),
        key=lambda x:x[1],
        reverse=True
    )

    return ranked


# ======================== ROUTES ========================

@app.route("/search",methods=["POST"])
def search():

    data=request.json
    query=data.get("query","")

    if not query:
        return jsonify({"error":"Empty query"}),400

    lawtype,domain,intent=classify_query(query)

    expanded=expand_query(query)

    candidates=hybrid_search(
        expanded,
        lawtype,
        domain,
        top_k=20
    )

    print("Candidates:", len(candidates))

    for c in candidates[:5]:
        print("CANDIDATE SAMPLE:", c)

        ranked=rerank(
            query,
            candidates
        )

    print("Ranked size:", len(ranked))

    top_laws = []

    for law, score in ranked[:3]:

        explanation = generate_explanation(
            law["title"],
            law["description"],
            query
        )

        top_laws.append({
            "section": law["section"],
            "title": law["title"],
            "description": law["description"],
            "score": float(score),
            "explanation": explanation
        })

    return jsonify({
        "laws": top_laws,
        "classification": {
            "LawType": lawtype,
            "Domain": domain,
            "Intent": intent
        }
    })

    


lawyers=[
    {"name":"Amit Sharma","lat":18.5204,"lon":73.8567},
    {"name":"Priya Desai","lat":19.0760,"lon":72.8777}
]

@app.route("/lawyers")
def get_lawyers():

    lat=float(request.args.get("lat"))
    lon=float(request.args.get("lon"))

    user=(lat,lon)

    for l in lawyers:
        l["distance"]=geodesic(
            user,
            (l["lat"],l["lon"])
        ).km

    return jsonify(
        sorted(
            lawyers,
            key=lambda x:x["distance"]
        )
    )


if __name__=="__main__":
    app.run(debug=True)