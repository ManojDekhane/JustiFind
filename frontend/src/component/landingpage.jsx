// LandingPage.jsx
import React, { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    try {
      // Replace with real API later
      const pythonRes = await axios.post("http://localhost:5000/api/search", { query });
      const pythonResults = pythonRes.data.results;

      const groqResults = await Promise.all(
        pythonResults.map(async (item) => {
          const groqRes = await axios.post("http://localhost:5000/api/groq", { lawId: item.id });
          return { ...item, description: groqRes.data.description };
        })
      );

      setResults(groqResults);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex flex-col items-center p-6">
      {/* Hero Section */}
      <div className="text-center mb-12 relative max-w-3xl">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          ⚖ Law Search Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Search and explore laws with detailed descriptions and categories
        </p>
      </div>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl flex shadow-lg rounded-full overflow-hidden mb-8"
      >
        <input
          type="text"
          placeholder="Enter law name or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-4 focus:outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 font-semibold hover:bg-blue-800 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-6">
          <div className="loader border-4 border-blue-300 border-t-blue-700 rounded-full w-12 h-12 animate-spin mx-auto"></div>
        </div>
      )}

      {/* Results */}
      <div className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((res) => {
          const isExpanded = expandedIds.includes(res.id);
          return (
            <div
              key={res.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-shadow cursor-pointer"
              onClick={() => toggleExpand(res.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-xl text-blue-800">{res.title || res.name}</h2>
                {res.category && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                    {res.category}
                  </span>
                )}
              </div>
              <p className={`text-gray-600 overflow-hidden transition-max-h duration-300 ${isExpanded ? 'max-h-96' : 'max-h-16'}`}>
                {res.description}
              </p>
              <span className="text-blue-700 font-medium mt-2 inline-block">
                {isExpanded ? 'Show less ▲' : 'Read more ▼'}
              </span>
            </div>
          );
        })}
      </div>

      {/* No results */}
      {!loading && results.length === 0 && (
        <p className="mt-6 text-gray-500">No results yet. Try searching above.</p>
      )}

      {/* Loader CSS */}
      <style>
        {`
          .loader {
            border-top-color: #1e40af;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
