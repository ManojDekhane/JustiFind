import React, { useState } from "react";
import axios from "axios";

const LegalNewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/legal-news");
      setNews(res.data.news);
    } catch (err) {
      console.error("Error fetching news", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Legal News</h1>
      <button
        onClick={fetchNews}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Fetch Latest News
      </button>

      {loading && <p className="mt-4">Loading...</p>}

      <ul className="mt-6 space-y-4">
        {news.map((item, idx) => (
          <li key={idx} className="border-b pb-2">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-600">{item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalNewsPage;
