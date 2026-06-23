import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 Ask me any legal question." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔽 Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/ai/chat", {

        query: input
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.response || "No response found.",
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error fetching response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col bg-background">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-grow">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">AI Legal Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Get instant legal guidance powered by AI
          </p>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto space-y-6 mb-6 pr-2">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar */}
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                  ⚖️
                </div>
              )}

              {/* Message */}
              {/* <div
                className={`p-4 rounded-2xl max-w-[75%] shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div> */}
              <div
  className={`p-4 rounded-2xl max-w-[75%] shadow-md border transition-all leading-relaxed ${
    msg.role === "user"
      ? "bg-primary text-white ml-auto"
      : "bg-background text-foreground border-border/50"
  }`}
>
  <div className="prose prose-sm max-w-none prose-invert">
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 text-sm leading-relaxed">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-primary">
            {children}
          </strong>
        ),
        ul: ({ children }) => (
          <ul className="list-disc ml-4 space-y-1">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-sm opacity-90">{children}</li>
        ),
        code: ({ children }) => (
          <code className="bg-black/10 px-1 py-0.5 rounded text-xs">
            {children}
          </code>
        ),
      }}
    >
      {msg.content}
    </ReactMarkdown>
  </div>
</div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  👤
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                ⚖️
              </div>

              <div className="bg-muted px-4 py-2 rounded-2xl text-sm animate-pulse">
                AI is typing...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="sticky bottom-4 mb-4">
          <div className="flex items-center gap-2 bg-card border rounded-2xl p-2 shadow-md">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your legal question..."
              className="flex-1 bg-transparent px-4 py-2 outline-none border rounded-2xl"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 rounded-xl bg-primary text-white hover:scale-105 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AIAssistantPage;