"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Clock } from "lucide-react";
import { Cat } from "@/components/cat/Cat";

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
  const [waveTrigger, setWaveTrigger] = useState(0);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat panel */}
      {isOpen && (
        <div
          className="mb-4 w-[92vw] max-w-sm sm:max-w-md h-120 rounded-2xl border border-line rim
                     bg-surface/95 backdrop-blur-xl elev-lg
                     flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface">
            <button
              type="button"
              onClick={() => setWaveTrigger((n) => n + 1)}
              className="flex items-center gap-2.5 text-left"
              aria-label="Wave hello"
            >
              <Cat size={40} waveTrigger={waveTrigger} />
              <div>
                <p className="text-sm font-medium text-ink leading-tight">Angelo&apos;s Portfolio Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber" />
                  </span>
                  <span className="text-[10px] text-muted">Online · answers from this site</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-ink transition-colors"
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
                      ? "bg-ink text-paper font-medium"
                      : "bg-paper text-ink border border-line"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-paper border border-line rounded-xl px-3 py-2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-amber animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up suggestions after the latest assistant reply */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-1">
                {lastMessage.suggestions!.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs text-muted border border-line rounded-full px-3 py-1.5
                               hover:bg-amber/10 hover:text-ink transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cooldown banner */}
          {cooldownRemaining > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted border-t border-line bg-amber/5">
              <Clock size={13} />
              Message limit reached — try again in {formatCountdown(cooldownRemaining)}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-line p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={cooldownRemaining > 0}
                placeholder={cooldownRemaining > 0 ? "Please wait..." : "Ask a question..."}
                className="flex-1 bg-paper text-sm text-ink placeholder-muted rounded-full px-4 py-2.5
                           border border-line focus:outline-none focus:ring-1 focus:ring-amber/60
                           disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || cooldownRemaining > 0}
                className="shrink-0 p-2.5 rounded-full bg-ink text-paper disabled:opacity-40 disabled:cursor-not-allowed
                           hover:opacity-90 transition-opacity"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
            <p className="text-center text-[9.5px] text-muted mt-2">
              Answers come from this site only and can be wrong. Chats are not stored.
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-surface border border-line
                   elev-lg rim hover:scale-105 transition-transform duration-200"
        aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}
      >
        {isOpen ? <X size={20} className="text-ink" /> : <Cat size={36} />}
      </button>
    </div>
  );
}