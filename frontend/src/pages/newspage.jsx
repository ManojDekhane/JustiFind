import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
   const fetchNews = async () => {
  try {


const res = await fetch("http://localhost:8080/news");
const data = await res.json();

    setNews(data);

  } catch (err) {
    console.error("Error fetching news:", err);
  }
};

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Legal News
      </h1>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {news.map((item, index) => (
    <a
      key={index}
      href={item.link} 
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500 cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-3">
          {item.title} 
        </h2>
        <p className="text-sm text-gray-500">
          Click to read full article
        </p>
      </div>
    </a>
  ))}
</div>

    </div>
  );
}
