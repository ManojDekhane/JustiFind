import React, { useState, useRef } from "react";
import axios from "axios";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Button = ({ children, onClick, className = "", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-full bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </button>
);

//Ready-made Card
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-md p-4 ${className}`}>{children}</div>
);

const CardContent = ({ children }) => <div className="space-y-2">{children}</div>;

export default function JustiFindLanding() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [lawyerLoading, setLawyerLoading] = useState(false);

  const recognitionRef = useRef(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition && !recognitionRef.current) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
    recognitionRef.current = recognition;
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        handleSearch();
      };
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };



// export default function JustiFindLanding() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");  // ✅ NEW

//   const recognitionRef = useRef(null);
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (SpeechRecognition && !recognitionRef.current) {
//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = true;
//     recognition.lang = "en-IN";

//     // ✅ Voice started
//     recognition.onstart = () => {
//       setStatusMessage("🎤 Voice active, listening...");
//     };

//     // ✅ Voice ended without error
//     recognition.onend = () => {
//       setIsListening(false);
//       setStatusMessage((prev) => prev === "🎤 Voice active, listening..." ? "⏹ Voice stopped." : prev);
//       handleSearch();
//     };

//     // ✅ Speech detected then silence
//     recognition.onspeechend = () => {
//       setStatusMessage("⌛ Processing your speech...");
//     };

//     // ✅ When speech is received
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuery(transcript);
//       setStatusMessage(`✅ Heard: "${transcript}"`);
//     };

//     // ✅ Error handling
//     recognition.onerror = (event) => {
//       console.log("❌ Error:", event.error);
//       if (event.error === "no-speech") {
//         setStatusMessage("❌ No speech detected. Please speak louder or check your mic.");
//       } else if (event.error === "audio-capture") {
//         setStatusMessage("❌ No microphone detected. Please connect or enable it.");
//       } else if (event.error === "not-allowed") {
//         setStatusMessage("❌ Mic permission blocked. Allow microphone access in browser settings.");
//       } else {
//         setStatusMessage(`❌ Error: ${event.error}`);
//       }
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;
//   }

//   const handleVoiceInput = () => {
//     if (!recognitionRef.current) {
//       setStatusMessage("⚠ Speech Recognition not supported in this browser.");
//       return;
//     }

//     if (!isListening) {
//       setIsListening(true);
//       setStatusMessage("🎤 Activating microphone...");
//       recognitionRef.current.start();
//     } else {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setStatusMessage("⏹ Voice stopped manually.");
//     }
//   };






  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", { query });
      const data = response.data;
      setResults([
        {
          section: data.law.section,
          title: data.law.title,
          description: data.law.description,
          ai_response: data.ai_response,
        },
      ]);
    } catch (error) {
      console.error(error);
      setResults([{ title: "Error", description: "❌ Error fetching result. Please try again." }]);
    }

    setLoading(false);
  };

  // ✅ UPDATED: Fetch nearby lawyers using live GPS
  const fetchLawyers = async () => {
    setLawyerLoading(true);
    setLawyers([]);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLawyerLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await axios.get(`http://127.0.0.1:5000/lawyers?lat=${lat}&lon=${lon}&limit=5`);
          setLawyers(res.data.lawyers.slice(0, 5));
        } catch (err) {
          console.error(err);
          setLawyers([]);
        }

        setLawyerLoading(false);
      },
      (error) => {
        console.error(error);
        alert("Location access denied. Please enable GPS and try again.");
        setLawyerLoading(false);
      }
    );
  };

  const formatAIResponse = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header
      <header className="bg-white  p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">JustiFind</h1>
        <nav className="space-x-4  p-4">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/laws" className="text-gray-700 hover:text-blue-600">Laws by Category</Link>
      <Link to="/ngos" className="text-gray-700 hover:text-blue-600">NGOs & Legal Aid</Link>
      <Link to="/news" className="text-gray-700 hover:text-blue-600">News</Link>
      <Link to="/myths" className="text-gray-700 hover:text-blue-600">Myths vs Facts</Link>
    </nav>
      </header> */}

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

          <button onClick={handleVoiceInput} className={`mx-2 ${isListening ? "text-red-500" : "text-gray-500"}`}>
            <Mic className={isListening ? "animate-pulse" : ""} />
          </button>

          <Button onClick={handleSearch} disabled={loading}>
            <Search size={18} /> {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* {statusMessage && (
          <p className="mt-3 text-sm text-gray-600">
            {statusMessage}
          </p>
        )} */}


        {/* Results */}
        {results.length > 0 && (
          <section className="mt-6 w-full max-w-2xl">
            {results.map((res, idx) => (
              <Card key={idx} className="mb-4 text-left">
                <CardContent>

                  {/* Section / Title */}
                  {res.section && (
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {/* {res.section} – {res.title} */}
                    </h3>
                  )}
                  {!res.section && (
                    <h3 className="text-lg font-semibold">
                      {/* {res.title} */}
                    </h3>
                  )}

                  {/* Only show law description, NOT user query */}
                  {res.description && (
                    <p className="text-gray-700 mb-4 whitespace-pre-line">
                      {/* {res.description} */}
                    </p>
                  )}

                  {/* AI Response Box */}

                  {res.ai_response && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p
                        className="text-gray-800 leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: formatAIResponse(res.ai_response) }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
            ))}
            
          </section>
        )}

        {/* ✅ Nearby Lawyers Section */}
        <section className="mt-12 max-w-3xl w-full text-center">
          <Button onClick={fetchLawyers} disabled={lawyerLoading}>
            {lawyerLoading ? "Finding..." : "Get Help"}
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {lawyers.map((lawyer, i) => (
              <Card key={i}>
                <CardContent>
                  <h4 className="font-semibold text-lg text-gray-800">{lawyer.name}</h4>
                  <p className="text-sm text-gray-600">📍 {lawyer.location}</p>
                  <p className="text-sm text-gray-600">📞 {lawyer.contact}</p>
                  <p className="text-sm text-gray-600">✉️ {lawyer.email}</p>
                  <p className="text-sm text-gray-600">⚖️ {lawyer.category}</p>
                  <p className="text-sm text-blue-600">Distance: {lawyer.distance.toFixed(2)} km</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {[
            { title: "🤖 AI Chatbot Support",
               desc: "Get instant legal answers in simple language." }
               ,
            { title: "📖 Know Your Rights", 
              desc: "Read categorized laws & real-world examples." }
              ,
            { title: "📰 Legal News Feed",
               desc: "Stay updated on important legal changes." }
               ,
            { title: "✅ Myths vs Facts", 
              desc: "Clear common legal misconceptions." },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-12 max-w-2xl w-full text-center">
          <h3 className="font-semibold text-lg mb-4">Popular Categories</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Labour Laws", 
            "Women Rights",
             "Cyber Crime",
              "Property Disputes", 
              "RTI", 
              "Consumer Rights"].map((cat) => (
              <span
                key={cat}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-blue-200"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 text-center">
          <p className="mb-3 text-gray-700">Need more help? Connect with verified NGOs & lawyers near you</p>
          <Button className="mx-auto block">Find Help</Button>
        </section>
      </main>

      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © {new Date().getFullYear()} JustiFind – Your Legal Rights, Simplified
      </footer>
    </div>
  );
}
