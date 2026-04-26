import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import mythFactDetailsData from "../localData/mythFactDescriptionData"

const MythFactDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // const data = mythFactDetailsData.find((item) => item.slug === slug);

  const data = mythFactDetailsData.get(slug);
  
  if (!data) {
    return <div className="p-10">Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary font-medium"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10 text-center">
        {data.title}
      </h1>

      {/* MYTH vs FACT */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* MYTH */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            ❌ Myth
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.myth}</p>
        </div>

        {/* FACT */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Fact
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.fact}</p>
        </div>
      </div>

      {/* EXPLANATION */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-semibold mb-3 text-primary">Explanation</h3>
        <p className="text-gray-700 leading-relaxed">
          {data.description}
        </p>
      </div>
      {/* FOOTER SOURCE TEXT */}
<div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border">
  <span className="font-medium text-gray-600">Sources:</span>
  <a
    href="https://www.livelaw.in"
    target="_blank"
    rel="noopener noreferrer"
    className="ml-2 hover:text-primary hover:underline"
  >
    Live Law
  </a>
  <span className="mx-1">•</span>
  <a
    href="https://www.barandbench.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary hover:underline"
  >
    Bar & Bench
  </a>
  <span className="mx-1">•</span>
  <a
    href="https://indiankanoon.org"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary hover:underline"
  >
    Indian Kanoon
  </a>
</div>
    </div>
  );
};

export default MythFactDetail;