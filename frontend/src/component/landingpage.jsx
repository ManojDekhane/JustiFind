import React, { useState } from "react";
import axios from "axios";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

// Ready-made Button
const Button = ({ children, onClick, className = "", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-full bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

// Ready-made Card
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-md p-4 ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div className="space-y-2">{children}</div>;

export default function JustiFindLanding() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleSearch = async () => {
  //   if (!query.trim()) return;
  //   setLoading(true);
  //   setResults([]);

  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/search", { query });
  //     const data = response.data.results || [];
  //     setResults(data);
  //   } catch (error) {
  //     console.error(error);
  //     setResults([{ title: "Error", description: "❌ Error fetching result. Please try again." }]);
  //   }

  //   setLoading(false);
  // };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", { query });
      const data = response.data;

      // Transform to match your Card rendering
      setResults([{
  section: data.law.section,
  title: data.law.title,
  description: data.law.description,   // from dataset
  ai_response: data.ai_response        // AI explanation
}]);


    } catch (error) {
      console.error(error);
      setResults([{ title: "Error", description: "❌ Error fetching result. Please try again." }]);
    }

    setLoading(false);
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">JustiFind</h1>
        <nav className="space-x-4">
          {["Home", "Laws by Category", "NGOs & Legal Aid", "News", "Myths vs Facts"].map((item) => (
            <a key={item} href="#" className="text-gray-700 hover:text-blue-600">{item}</a>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ask your legal question…
        </motion.h2>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-xl bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
          <input
            type="text"
            placeholder="Ask your legal question..."
            className="flex-grow focus:outline-none px-2 text-gray-700"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Mic className="text-gray-500 mx-2" />
          <Button onClick={handleSearch} disabled={loading}>
            <Search size={18} /> {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <section className="mt-6 w-full max-w-2xl">
            {results.map((res, idx) => (
              <Card key={idx} className="mb-4 text-left">
                <CardContent>
                 
                  {!res.section && <h3 className="text-lg font-semibold">{res.title}</h3>}
                  <p className="text-gray-700 whitespace-pre-line">{res.description}</p>
                  <p>{res.ai_response}</p>
                  {res.score && <p className="text-sm text-gray-500">Score: {res.score.toFixed(2)}</p>}
                </CardContent>
              </Card>
            ))}
          </section>


        )}

        {/* Key Features */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {[{ title: "🤖 AI Chatbot Support", desc: "Get instant legal answers in simple language." },
            { title: "📖 Know Your Rights", desc: "Read categorized laws & real-world examples." },
            { title: "📰 Legal News Feed", desc: "Stay updated on important legal changes." },
            { title: "✅ Myths vs Facts", desc: "Clear common legal misconceptions." }
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Popular Categories */}
        <section className="mt-12 max-w-2xl w-full text-center">
          <h3 className="font-semibold text-lg mb-4">Popular Categories</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Labour Laws","Women Rights","Cyber Crime","Property Disputes","RTI","Consumer Rights"].map((cat) => (
              <span key={cat} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-200">
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <p className="mb-3 text-gray-700">
            Need more help? Connect with verified NGOs & lawyers near you
          </p>
          <Button className="mx-auto block">Find Help</Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} JustiFind – Your Legal Rights, Simplified
      </footer>
    </div>
  );
}
