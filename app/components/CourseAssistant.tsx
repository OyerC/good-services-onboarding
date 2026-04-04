"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; text: string };

const ASSISTANT_TITLE_ID = "course-assistant-dialog-title";

export default function CourseAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      let data: unknown;
      try {
        data = await res.json();
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: `Request failed (${res.status}). Response was not JSON.`,
          },
        ]);
        return;
      }

      if (!res.ok) {
        const err =
          data &&
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : `Request failed (${res.status})`;
        setMessages((m) => [...m, { role: "assistant", text: err }]);
        return;
      }

      const reply =
        data &&
        typeof data === "object" &&
        data !== null &&
        "reply" in data &&
        typeof (data as { reply: unknown }).reply === "string"
          ? (data as { reply: string }).reply.trim()
          : "";

      if (!reply) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: "The API returned a success status but no reply text.",
          },
        ]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setMessages((m) => [...m, { role: "assistant", text: message }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition duration-200 ease-out hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/35 sm:bottom-6 sm:right-6"
      >
        Ask Oyer
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={ASSISTANT_TITLE_ID}
        >
          <button
            type="button"
            className="assistant-backdrop-enter absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
            aria-label="Close assistant"
            onClick={close}
          />

          <div
            className="assistant-panel-enter relative z-10 flex max-h-[min(88vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-background shadow-2xl ring-1 ring-foreground/10 sm:rounded-2xl sm:shadow-xl"
          >
            <header className="shrink-0 border-b border-foreground/10 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id={ASSISTANT_TITLE_ID} className="text-lg font-semibold tracking-tight">
                    Course Assistant
                  </h2>
                  <p className="mt-2 max-w-md text-[11px] leading-snug text-foreground/50">
                    This experimental assistant is part of the course experience. Use it with
                    curiosity.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                    Ask anything about the course, challenges or the Magic Wand
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-full p-2 text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label="Close"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={`${msg.role}-${i}-${msg.text.slice(0, 24)}`}
                    className={`assistant-msg-enter flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-foreground/[0.06] text-foreground/90"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-foreground/10 bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm"
              aria-busy={sending}
            >
              <div className="flex gap-2">
                <label htmlFor="course-assistant-message-input" className="sr-only">
                  Your question
                </label>
                <input
                  ref={inputRef}
                  id="course-assistant-message-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  className="min-w-0 flex-1 rounded-xl border border-foreground/15 bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground/45 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                  autoComplete="off"
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition duration-200 ease-out hover:bg-primary/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                  disabled={!input.trim() || sending}
                >
                  {sending ? "…" : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
