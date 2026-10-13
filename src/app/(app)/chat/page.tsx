"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, Button, Input } from "@/components/ui";
import { Send, Search, Circle } from "lucide-react";
import { relativeTime } from "@/lib/utils";

// Mock data — replace with real API calls / WebSocket
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    user: { name: "Priya K", username: "priyak", avatar_url: null, online: true },
    lastMessage: "That approach looks solid, let me try it",
    lastAt: new Date(Date.now() - 1000 * 60 * 2),
    unread: 2,
  },
  {
    id: "2",
    user: { name: "Rahul V", username: "rahulv", avatar_url: null, online: false },
    lastMessage: "Would love to collaborate on the war room feature",
    lastAt: new Date(Date.now() - 1000 * 60 * 45),
    unread: 0,
  },
  {
    id: "3",
    user: { name: "Aryan Shah", username: "aryanshah", avatar_url: null, online: true },
    lastMessage: "Check out this PR, feedback appreciated",
    lastAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unread: 1,
  },
];

const MOCK_MESSAGES = [
  { id: "1", user_id: "other", content: "Hey! Saw your DevProof project on the showcase", created_at: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "2", user_id: "me", content: "Thanks! Yeah been building it for a few weeks now. Still lots to do haha", created_at: new Date(Date.now() - 1000 * 60 * 28) },
  { id: "3", user_id: "other", content: "The XP system looks really well thought out. How are you handling the LeetCode verification?", created_at: new Date(Date.now() - 1000 * 60 * 25) },
  { id: "4", user_id: "me", content: "Using their public GraphQL API. It's not perfect but works for checking if a user has solved a problem.", created_at: new Date(Date.now() - 1000 * 60 * 20) },
  { id: "5", user_id: "other", content: "Smart. That approach looks solid, let me try it", created_at: new Date(Date.now() - 1000 * 60 * 2) },
];

export default function ChatPage() {
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    const t = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(t);
  }, [isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user_id: "me", content: input.trim(), created_at: new Date() },
    ]);
    setInput("");
    // Simulate response typing
    setTimeout(() => setIsTyping(true), 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 52px - 3rem)",
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* ─── Conversation List ────────────────────────────── */}
      <div
        style={{
          width: 280,
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          background: "var(--color-surface)",
          flexShrink: 0,
        }}
      >
        {/* Search */}
        <div style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.375rem 0.625rem",
            }}
          >
            <Search size={12} style={{ color: "var(--color-text-muted)" }} />
            <input
              placeholder="Search messages..."
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: "0.8125rem",
                color: "var(--color-text-primary)",
                width: "100%",
                fontFamily: "var(--font-sans)",
              }}
            />
          </div>
        </div>

        {/* Conversations */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {MOCK_CONVERSATIONS.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.75rem",
                background: activeConv.id === conv.id ? "var(--color-surface-raised)" : "transparent",
                border: "none",
                borderLeft: activeConv.id === conv.id ? "2px solid var(--color-accent)" : "2px solid transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Avatar src={conv.user.avatar_url} name={conv.user.name} size="sm" online={conv.user.online} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-primary)" }}>
                    {conv.user.name}
                  </span>
                  <span style={{ fontSize: "0.625rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                    {relativeTime(conv.lastAt)}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 150,
                    }}
                  >
                    {conv.lastMessage}
                  </span>
                  {conv.unread > 0 && (
                    <span
                      style={{
                        minWidth: 16,
                        height: 16,
                        borderRadius: 8,
                        background: "var(--color-accent)",
                        color: "#fff",
                        fontSize: "0.5625rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 4px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Chat Window ──────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
          }}
        >
          <Avatar src={activeConv.user.avatar_url} name={activeConv.user.name} size="sm" online={activeConv.user.online} />
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{activeConv.user.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <Circle
                size={6}
                fill={activeConv.user.online ? "var(--color-status-success)" : "var(--color-text-muted)"}
                color={activeConv.user.online ? "var(--color-status-success)" : "var(--color-text-muted)"}
              />
              <span style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                {activeConv.user.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {messages.map((msg) => {
            const isMe = msg.user_id === "me";
            return (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: isMe ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: "0.5rem",
                }}
              >
                {!isMe && (
                  <Avatar src={activeConv.user.avatar_url} name={activeConv.user.name} size="xs" />
                )}
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "0.5rem 0.75rem",
                    borderRadius: isMe ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: isMe ? "var(--color-accent)" : "var(--color-surface)",
                    border: isMe ? "none" : "1px solid var(--color-border)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    color: isMe ? "#fff" : "var(--color-text-primary)",
                  }}
                >
                  {msg.content}
                  <div
                    style={{
                      fontSize: "0.5625rem",
                      color: isMe ? "rgba(255,255,255,0.6)" : "var(--color-text-muted)",
                      marginTop: "0.25rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {relativeTime(msg.created_at)}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
              <Avatar src={activeConv.user.avatar_url} name={activeConv.user.name} size="xs" />
              <div
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "12px 12px 12px 2px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  gap: "3px",
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-text-muted)",
                      animation: `pulse-accent 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            gap: "0.625rem",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Message..."
            style={{
              flex: 1,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.5rem 0.875rem",
              fontSize: "0.875rem",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
          <Button variant="primary" size="md" onClick={handleSend} disabled={!input.trim()}>
            <Send size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
