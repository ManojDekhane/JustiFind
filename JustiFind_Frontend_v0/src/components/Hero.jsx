import { useState, useEffect } from 'react'
import { Search, Mic, Sparkles, ArrowRight, Shield, Users, BookOpen } from 'lucide-react'
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";

function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isListening, setIsListening] = useState(false)

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [lawCategory, setLawCategory] = useState('');

  const [lawyers, setLawyers] = useState([]);
  const [lawyerLoading, setLawyerLoading] = useState(false);

  const recognitionRef = useRef(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const placeholderText = "Ask your legal question..."

  if (SpeechRecognition && !recognitionRef.current) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognitionRef.current = recognition;
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isFocused && searchQuery === '') {
      let index = 0
      const interval = setInterval(() => {
        setTypedText(placeholderText.slice(0, index))
        index++
        if (index > placeholderText.length) {
          index = 0
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isFocused, searchQuery])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        query: searchQuery,
      });

      const data = response.data;

      setResults([
        {
          section: data.law?.section || "N/A",
          title: data.law?.title || "No title",
          description: data.law?.description || "",
          ai_response: data.ai_response || "No explanation available",
        },
      ]);

      // setLawCategory(data.law.category);

      setLawCategory(
        data.classification?.Domain || data.classification?.LawType || ""
      );
    } catch (error) {
      console.error(error);
      setResults([
        {
          title: "Error",
          description: "❌ Error fetching result. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition not supported");
      return;
    }

    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
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

  const fetchLawyers = async () => {
    setLawyerLoading(true);
    setLawyers([]);

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      setLawyerLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const url = `http://localhost:8080/lawyers/nearby?longitude=${lon}&latitude=${lat}&category=${encodeURIComponent(lawCategory)}&limit=5`;

          const res = await axios.get(url);

          setLawyers(res.data || []);
        } catch (err) {
          console.error(err);
          alert("Error fetching lawyers");
        }

        setLawyerLoading(false);
      },
      () => {
        alert("Enable location access");
        setLawyerLoading(false);
      }
    );
  };

  const quickActions = [
    { icon: Shield, label: 'Know Your Rights', color: 'from-emerald-500 to-teal-500' },
    { icon: Users, label: 'Find Legal Aid', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Browse Laws', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            AI-Powered Legal Assistance
          </span>
          <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
            New
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <span className="block text-balance">
            Legal Help Made
          </span>
          <span className="block mt-2">
            <span className="gradient-text">Simple</span>
            <span className="text-foreground"> & </span>
            <span className="gradient-text">Accessible</span>
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          Get instant answers to your legal questions with our AI-powered platform.
          Understand your rights, find legal aid, and navigate the law with confidence.
        </p>

        {/* Search Bar */}
        <div
          className={`relative max-w-2xl mx-auto mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div
            className={`relative group transition-all duration-500 ${isFocused ? 'scale-[1.02]' : ''
              }`}
          >
            {/* Glow effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-2xl blur-lg transition-opacity duration-500 ${isFocused ? 'opacity-60' : 'opacity-0 group-hover:opacity-30'
                }`}
            />

            {/* Search container */}
            <div className="relative flex items-center glass-strong rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
              <div className="flex items-center justify-center w-14 h-14 text-muted-foreground">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-primary' : ''}`} />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=""
                className="flex-1 h-14 bg-transparent text-foreground placeholder:text-muted-foreground text-lg focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              {/* Animated placeholder */}
              {searchQuery === '' && !isFocused && (
                <span className="absolute left-14 text-muted-foreground text-lg pointer-events-none">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              )}

              {/* Voice button */}
              <button
                onClick={handleVoiceInput}
                className={`flex items-center justify-center w-12 h-12 mr-1 rounded-xl transition-all duration-300 ${isListening
                  ? 'bg-red-500/20 text-red-500 animate-pulse'
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                aria-label="Voice search"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 h-12 px-6 mr-1 bg-gradient-to-r from-primary to-cyan-500 text-primary-foreground font-medium rounded-xl hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading && <p className="text-muted-foreground mt-4">Loading...</p>}


          {results.length > 0 && (
            <div className="mt-8 max-w-2xl mx-auto text-left">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="glass p-6 rounded-2xl shadow-lg border border-border/50"
                >
                  {/* Section + Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                      {item.section}
                    </span>
                    {lawCategory && (
                      <span className="text-xs text-muted-foreground">
                        {lawCategory}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2 text-foreground">
                    {item.title}
                  </h2>

                  {/* Short description */}
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  {/* AI Explanation */}
                  <div className="border-t border-border/50 pt-4">
                    <h3 className="text-sm font-semibold text-primary mb-2">
                      AI Explanation
                    </h3>

                    <div className="prose prose-invert max-w-none text-sm">
                      <ReactMarkdown>
                        {item.ai_response}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {results.length > 0 && results[0]?.ai_response && (
            <div className="mt-6 text-center">
              <button
                onClick={fetchLawyers}
                className="px-6 py-3 bg-primary text-white rounded-xl"
              >
                {lawyerLoading ? "Finding..." : "Get Help"}
              </button>

              {lawyers.length > 0 && (
                <div className="mt-8 grid gap-4">
                  {lawyers.map((lawyer, i) => (
                    <div key={i} className="glass p-4 rounded-xl">
                      <h3 className="font-bold">{lawyer.name}</h3>
                      <p>📍 {lawyer.city}</p>
                      <p>📞 {lawyer.contact}</p>
                      <p>⚖️ {lawyer.category}</p>
                      <p>Distance: {lawyer.distance?.toFixed(2)} km</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {/* Search suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {['Tenant Rights', 'Consumer Protection', 'Employment Law', 'Family Law'].map((term, index) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground glass rounded-full hover:bg-accent/50 transition-all duration-200 hover:scale-105"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          {quickActions.map((action, index) => (
            <button
              key={action.label}
              className="group flex items-center gap-3 px-5 py-3 glass rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-foreground">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Trust indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-16 pt-8 border-t border-border/50 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-cyan-500/50 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground"
                >
                  {['A', 'B', 'C', 'D'][i]}
                </div>
              ))}
            </div>
            <span className="text-sm">
              <strong className="text-foreground">10,000+</strong> users helped
            </span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span>4.9/5 rating</span>
          </div>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Free</strong> to use
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
