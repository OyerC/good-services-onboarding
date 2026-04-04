"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; text: string };

const ASSISTANT_TITLE_ID = "course-assistant-dialog-title";
const IE_BLUE = "#003A8F";

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
  }, [messages, open, sending]);

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
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 !bg-transparent appearance-none rounded-full border border-solid px-4 py-3 text-sm font-semibold shadow-none transition-colors [-webkit-tap-highlight-color:transparent] hover:!bg-transparent active:!bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 sm:bottom-6 sm:right-6"
        style={{
          borderColor: IE_BLUE,
          color: IE_BLUE,
          outlineColor: IE_BLUE,
          backgroundColor: "transparent",
        }}
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
            className="assistant-backdrop-enter absolute inset-0 bg-foreground/20 backdrop-blur-[1px]"
            aria-label="Close assistant"
            onClick={close}
          />

          <div
            className="assistant-panel-enter relative z-10 flex max-h-[min(90vh,680px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-foreground/15 bg-background sm:rounded-2xl"
          >
            <header className="shrink-0 border-b border-foreground/10 px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2
                    id={ASSISTANT_TITLE_ID}
                    className="text-lg font-semibold tracking-tight sm:text-xl"
                  >
                    Course Assistant
                  </h2>
                  <p className="mt-3 max-w-md text-[12px] leading-relaxed text-foreground/50 sm:text-[13px]">
                    This experimental assistant is part of the course experience. Use it with
                    curiosity.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65 sm:text-[0.9375rem]">
                    Ask anything about the course, challenges or the Magic Wand
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 rounded-full p-2.5 text-foreground/55 transition hover:bg-foreground/5 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
                  style={{ outlineColor: IE_BLUE }}
                  aria-label="Close"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7">
              <div className="flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div
                    key={`${msg.role}-${i}-${msg.text.slice(0, 24)}`}
                    className={`assistant-msg-enter flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[min(92%,28rem)] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed sm:text-base sm:leading-7 ${
                        msg.role === "user"
                          ? "border border-primary/25 bg-primary/10 text-foreground"
                          : "border border-foreground/10 bg-foreground/[0.04] text-foreground/90"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {sending ? (
                  <div className="flex justify-start">
                    <div className="assistant-thinking rounded-2xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-[0.9375rem] text-foreground/65 sm:text-base">
                      Thinking…
                    </div>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="shrink-0 border-t border-foreground/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pt-6"
              aria-busy={sending}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
                <label htmlFor="course-assistant-message-input" className="sr-only">
                  Your question
                </label>
                <input
                  ref={inputRef}
                  id="course-assistant-message-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  className="min-h-[3rem] min-w-0 flex-1 rounded-xl border border-foreground/20 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 disabled:opacity-60"
                  autoComplete="off"
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-xl border-2 px-6 text-base font-semibold transition-colors hover:bg-foreground/[0.03] disabled:opacity-45 sm:h-auto sm:min-w-[5.5rem]"
                  style={{ borderColor: IE_BLUE, color: IE_BLUE }}
                  disabled={!input.trim() || sending}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
