import React from "react";
import { useParams } from "react-router-dom";
import legalMythsData from "../localData/mythFactDescriptionData.js";

const mythFactDetails = () => {
  const { topic } = useParams();

  let data = legalMythsData.get(topic);

  // // If not found directly, try matching via slug (fallback)
  // if (!data) {
  //   for (let [key, value] of legalMythsData.entries()) {
  //     const slug = key
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, "-")
  //       .replace(/^-+|-+$/g, "");
  //     if (slug === topic) {
  //       data = value;
  //       break;
  //     }
  //   }
  // }
  
  if (!data) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Topic Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          Sorry, we couldn’t find details for this topic.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        {data.title.toUpperCase()} — MYTHS vs FACTS
      </h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Myth:</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{data.myth}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-green-600 mb-2">Fact:</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{data.fact}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-green-600 mb-2">Description:</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{data.description}</p>
      </div>
    </div>
  );
};

export default mythFactDetails;