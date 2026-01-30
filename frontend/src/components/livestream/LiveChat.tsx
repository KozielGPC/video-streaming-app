import type { ReactElement } from "react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

interface LiveChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  moderator: { bg: "bg-green-600", text: "text-white" },
  vip: { bg: "bg-pink-600", text: "text-white" },
  subscriber: { bg: "bg-purple-600", text: "text-white" },
  founder: { bg: "bg-yellow-600", text: "text-black" },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ChatMessageItem({ message }: { message: ChatMessage }): ReactElement {
  return (
    <div className="flex items-start gap-3 py-2 px-3 hover:bg-white/5 rounded transition-colors">
      <img
        src={message.author.avatarUrl}
        alt={message.author.name}
        className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {message.author.badges?.map((badge) => (
            <span
              key={badge}
              className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase",
                badgeColors[badge]?.bg || "bg-gray-600",
                badgeColors[badge]?.text || "text-white"
              )}
            >
              {badge === "moderator" ? "MOD" : badge.slice(0, 3).toUpperCase()}
            </span>
          ))}
          <span className="font-semibold text-purple-400 text-sm">
            {message.author.name}
          </span>
          <span className="text-[hsl(var(--muted-foreground))] text-xs">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
        <p className="text-[hsl(var(--foreground))] text-sm break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export function LiveChat({
  messages,
  onSendMessage,
}: LiveChatProps): ReactElement {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAutoScroll]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      50;
    setIsAutoScroll(isAtBottom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsAutoScroll(true);
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <h2 className="font-semibold text-[hsl(var(--foreground))]">
          Stream Chat
        </h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {messages.length} messages
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[hsl(var(--muted))] scrollbar-track-transparent"
      >
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {!isAutoScroll && (
        <div className="flex justify-center py-2 border-t border-[hsl(var(--border))]">
          <button
            onClick={scrollToBottom}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
            New messages below
          </button>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-3 py-2 bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-lg text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
              inputValue.trim()
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] cursor-not-allowed"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
