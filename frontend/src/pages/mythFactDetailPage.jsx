// src/pages/InfoDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const InfoDetails = () => {
  const { topic } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-sky-600 mb-4">
        {topic.replace("-", " ").toUpperCase()} INFORMATION
      </h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        Here you can display full details about <b>{topic}</b>.  
        You can fetch more info from an API or static content file here.
      </p>
    </div>
  );
};

export default InfoDetails;
