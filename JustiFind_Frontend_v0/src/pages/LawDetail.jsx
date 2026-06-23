import { useParams, useNavigate } from "react-router-dom";
import { lawData } from "../localData/lawData";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import ReactMarkdown from "react-markdown";

const LawDetail = () => {

  const [aiExplanation, setAiExplanation] = useState("");
  const [loading, setLoading] = useState(false);


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const law = lawData.find((item) => item.id === Number(id));


  if (!law) return <div className="p-8">Not Found</div>;


  const handleExplain = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/explain-law", {
        title: law.title,
        description: law.description
      });

      setAiExplanation(res.data.explanation);

    } catch (err) {
      console.error(err);
      setAiExplanation("Error fetching explanation.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary font-medium"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">
        {law.title}
      </h1>

      {/* Meta */}
      <div className="flex gap-3 mb-4">
        <span className="px-3 py-1 text-xs bg-gray-200 rounded-full">
          {law.categoryName || law.category}
        </span>

        <span className="text-sm text-gray-500">
          {law.section}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-lg leading-relaxed text-gray-700">
          {law.description}
        </p>
      </div>

      {/* AI Button (future feature) */}
      <button
        onClick={handleExplain}
        className="mt-6 px-6 py-3 bg-primary text-white rounded-xl"
      >
        {loading ? "Explaining..." : "🤖 Explain this law"}
      </button>

      {aiExplanation && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">AI Explanation</h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            <ReactMarkdown>
              {aiExplanation}
            </ReactMarkdown>
          </div>
        </div>
      )}


    </div>
  );
};

export default LawDetail;