import { useEffect, useState } from "react";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Legal News
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading news...
          </p>
        )}

        {/* News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="glass p-6 rounded-2xl border border-border/50 hover:scale-105 transition-all duration-300">
                
                <h2 className="text-lg font-semibold mb-3 group-hover:text-primary transition">
                  {item.title}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Click to read full article →
                </p>

              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;