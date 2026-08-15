"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Clock } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const INITIAL_SUGGESTIONS = [
  "What projects has Angelo built?",
  "What's his tech stack?",
  "Tell me about his backend experience",
];

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hey! I'm Angelo's portfolio assistant. Ask me about his projects, skills, or experience.",
  suggestions: INITIAL_SUGGESTIONS,
};

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Cooldown countdown ticker
  useEffect(() => {
    if (!cooldownUntil) return;

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownRemaining(remaining);
      if (remaining <= 0) setCooldownUntil(null);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  function formatCountdown(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || isLoading || cooldownRemaining > 0) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setCooldownUntil(Date.now() + (data.retryAfterSeconds ?? 60) * 1000);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message || "You've reached the message limit. Please try again shortly." },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.ok ? data.reply : "Something went wrong. Please try again.",
          suggestions: res.ok ? data.suggestions : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I couldn't connect just now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const lastMessage = messages[messages.length - 1];
  const showSuggestions =
    !isLoading &&
    cooldownRemaining === 0 &&
    lastMessage?.role === "assistant" &&
    lastMessage.suggestions &&
    lastMessage.suggestions.length > 0;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Chat panel */}
      {isOpen && (
        <div
          className="mb-4 w-[92vw] max-w-sm sm:max-w-md h-120 rounded-2xl border border-cyan-400/30
                     bg-slate-950/95 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]
                     flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/20 bg-linear-to-r from-cyan-500/10 to-transparent">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </div>
              <span className="text-sm font-medium text-cyan-50">Angelo&apos;s Portfolio Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cyan-300/70 hover:text-cyan-300 transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 font-medium"
                      : "bg-slate-800/80 text-cyan-50 border border-cyan-400/10"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-cyan-400/10 rounded-xl px-3 py-2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up suggestions after the latest assistant reply */}
            {showSuggestions && (
              <div className="flex flex-col gap-2 pt-1">
                {lastMessage.suggestions!.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs text-cyan-200/80 border border-cyan-400/20 rounded-lg px-3 py-2
                               hover:bg-cyan-400/10 hover:text-cyan-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cooldown banner */}
          {cooldownRemaining > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-cyan-300/80 border-t border-cyan-400/20 bg-cyan-400/5">
              <Clock size={13} />
              Message limit reached — try again in {formatCountdown(cooldownRemaining)}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-cyan-400/20 p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={cooldownRemaining > 0}
              placeholder={cooldownRemaining > 0 ? "Please wait..." : "Ask about Angelo's work..."}
              className="flex-1 bg-slate-900/80 text-sm text-cyan-50 placeholder-cyan-300/40 rounded-lg px-3 py-2
                         border border-cyan-400/20 focus:outline-none focus:ring-1 focus:ring-cyan-400/60
                         disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || cooldownRemaining > 0}
              className="p-2 rounded-lg bg-cyan-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed
                         hover:bg-cyan-400 transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-cyan-500 text-slate-950 pl-4 pr-5 py-3
                   shadow-[0_0_25px_-5px_rgba(34,211,238,0.7)] hover:bg-cyan-400 hover:scale-105
                   transition-all duration-200 font-medium text-sm"
        aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}
      >
        {isOpen ? <X size={18} /> : <Sparkles size={18} />}
        {isOpen ? "Close" : "Ask about Angelo"}
        {!isOpen && <MessageCircle size={18} className="ml-0.5" />}
      </button>
    </div>
  );
}