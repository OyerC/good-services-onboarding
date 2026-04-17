"use client";

import type { CSSProperties } from "react";
import { useCallback, useMemo, useState } from "react";
import MobileSwipeNav from "../../components/MobileSwipeNav";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

const PROMPT_TEXT = `You are my “Magic Wand” — a questioning engine designed to help me improve as a person.

I want to improve the following aspect of myself:
[WRITE HERE WHAT YOU WANT TO IMPROVE]

Your role:
- Do not give me answers unless I ask for them.
- Ask thoughtful and sometimes uncomfortable questions.
- Help me reflect on my behavior, decisions, and patterns.
- Help me become more aware of how I act and why.

Every time I share something with you, you should:
1. Ask 3–5 questions that help me reflect more deeply.
2. Point out anything I may not be seeing clearly.
3. Gently challenge inconsistencies in what I say or do.
4. Help me understand what I could improve.

Tone:
- Calm, respectful, and direct
- Curious, not judgmental

Important:
This is not about being right. It’s about improving.
Do not try to impress me. Help me think better.`;

export default function DeeperIntoMagicWandScreen() {
  const [copied, setCopied] = useState(false);

  const helperText = useMemo(
    () => "Paste it into a new ChatGPT chat and replace the part in brackets.",
    [],
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROMPT_TEXT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="min-h-screen screen-breathe screen-breathe-magic-wand text-foreground">
      <MobileSwipeNav prevHref="/onboarding/magic-wand" nextHref={null} />

      <main className="stagger mx-auto flex w-full max-w-2xl flex-col px-6 pb-20 pt-6 text-center sm:px-8 sm:pt-8">
        <h1 className="stagger-item text-4xl font-semibold tracking-tight" style={stagger(0)}>
          🔮 The Magic Wand — Make it yours
        </h1>

        <div
          className="stagger-item mt-8 space-y-6 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(1)}
        >
          <p>This is your space.</p>

          <div className="space-y-2">
            <p>Before using the Magic Wand, decide one thing:</p>
            <p className="font-medium text-foreground">👉 What would you like to improve in yourself?</p>
          </div>

          <div className="space-y-2">
            <p>It could be:</p>
            <div className="space-y-1">
              <p>- how you communicate</p>
              <p>- how you listen</p>
              <p>- how you deal with uncertainty</p>
              <p>- how you make decisions</p>
              <p>- how you work with others</p>
            </div>
          </div>

          <p>There’s no right answer.</p>
        </div>

        <section
          className="stagger-item mt-12 rounded-2xl border border-foreground/10 bg-tint px-6 py-10 text-left sm:px-8"
          style={stagger(2)}
        >
          <div className="space-y-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                How to set it up
              </p>
              <div className="mt-4 space-y-3 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
                <p>Open ChatGPT and create a new chat called “Magic Wand”.</p>
                <p>Then paste the prompt below and adapt it if you want.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                How to use it
              </p>
              <div className="mt-4 space-y-3 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
                <p>After each class:</p>
                <div className="space-y-1">
                  <p>- Share what you did</p>
                  <p>- How you felt</p>
                  <p>- What was easy or difficult</p>
                  <p>- How you reacted</p>
                </div>
                <div className="space-y-1 pt-1">
                  <p>The Magic Wand will:</p>
                  <p>- ask you better questions</p>
                  <p>- help you notice patterns</p>
                  <p>- help you improve over time</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                Important
              </p>
              <div className="mt-4 space-y-3 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
                <p>This is completely optional.</p>
                <p>It will not be evaluated.</p>
                <p>No one will see it but you.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                Why it matters
              </p>
              <div className="mt-4 space-y-3 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
                <p>If you use it consistently,</p>
                <p className="font-medium text-foreground">
                  👉 you won’t just improve your work — you’ll improve yourself.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="stagger-item mt-10 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-8 text-left sm:px-8"
          style={stagger(3)}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Prompt
          </p>

          <pre className="mt-4 whitespace-pre-wrap text-[13px] leading-6 text-foreground/80 sm:text-sm">
            {PROMPT_TEXT}
          </pre>

          <div className="mt-6 flex flex-col items-stretch gap-3">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-solid px-6 text-base font-semibold transition-colors hover:bg-foreground/[0.03] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
            >
              {copied ? "Copied" : "Copy prompt"}
            </button>
            <p className="text-center text-[12px] leading-relaxed text-foreground/45 sm:text-[13px]">
              {helperText}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

