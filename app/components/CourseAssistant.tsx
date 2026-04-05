"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ASSISTANT_TITLE_ID = "course-assistant-dialog-title";
const IE_BLUE = "#003A8F";

const CUSTOM_GPT_URL =
  process.env.NEXT_PUBLIC_CHATGPT_URL ??
  "https://chatgpt.com/g/g-69d21788664c8191a388f2294d841c27-good-services-ai-assistant";

const SUPPORT_EMAIL = "ocorazon@faculty.ie.edu";
const MAILTO_HREF = `mailto:${SUPPORT_EMAIL}`;

export default function CourseAssistant() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => ctaRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

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
            className="assistant-panel-enter relative z-10 flex max-h-[min(90vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-foreground/15 bg-background sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-2 pt-6 sm:px-8 sm:pt-8">
              <h2
                id={ASSISTANT_TITLE_ID}
                className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                Ask Oyer
              </h2>
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

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-8">
              <div className="flex flex-col gap-6">
                <div className="space-y-4 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base sm:leading-7">
                  <p>This is part of the course experience.</p>
                  <p>
                    You are about to enter a space where you can ask questions and explore your
                    thinking.
                  </p>
                  <p>Use it when you have a real question.</p>
                </div>

                <p className="text-[13px] leading-relaxed text-foreground/55 sm:text-sm">
                  This assistant is experimental. It is here to help you think, not to replace human
                  guidance.
                </p>

                <p className="text-[13px] leading-relaxed text-foreground/50 sm:text-sm">
                  If you need direct human support, email Oyer at{" "}
                  <a
                    href={MAILTO_HREF}
                    className="font-medium text-primary underline decoration-primary/35 underline-offset-2 transition hover:decoration-primary"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </p>

                <div className="flex flex-col gap-3 pt-1">
                  <button
                    type="button"
                    ref={ctaRef}
                    onClick={() =>
                      window.open(CUSTOM_GPT_URL, "_blank", "noopener,noreferrer")
                    }
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-solid px-6 text-base font-semibold transition-colors hover:bg-foreground/[0.03] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
                    style={{ borderColor: IE_BLUE, color: IE_BLUE, outlineColor: IE_BLUE }}
                  >
                    Open in ChatGPT
                  </button>
                  <p className="text-center text-[12px] leading-relaxed text-foreground/45 sm:text-[13px]">
                    You can come back here at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
