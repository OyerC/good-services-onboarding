"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

type Challenge = {
  letter: string;
  title: string;
  description: string;
};

export default function ChallengesScreen() {
  const challenges: Challenge[] = useMemo(
    () => [
      {
        letter: "A.",
        title: "Nagami Club",
        description: "A member program that turns customer habits into service value.",
      },
      {
        letter: "B.",
        title: "Nagami on Wheels",
        description: "A mobile showroom that delivers demos and collects real constraints.",
      },
      {
        letter: "C.",
        title: "Material Rebirth",
        description: "Design for reuse: circular material flows and refurbishment services.",
      },
      {
        letter: "D.",
        title: "Space as a Service",
        description: "Offer spaces on-demand with performance metrics tied to outcomes.",
      },
      {
        letter: "E.",
        title: "Modular Spaces for Events & Fairs",
        description: "Reusable modular setups designed for fast assembly and reuse cycles.",
      },
      {
        letter: "F.",
        title: "B2B Circular Display",
        description: "Trade-ready display systems that circulate through partners and time.",
      },
      {
        letter: "G.",
        title: "Queue as a Service",
        description: "Manage wait times and capacity as a measurable service for users.",
      },
      {
        letter: "H.",
        title: "Nagami Experience Lab",
        description: "A test environment that prototypes service journeys with real feedback.",
      },
      {
        letter: "I.",
        title: "Nagami Rotation Club",
        description: "Rotate products over time to extend lifespan and reduce waste.",
      },
      {
        letter: "J.",
        title: "Nagami as a Service",
        description: "Transform ownership into outcomes with subscriptions and lifecycle support.",
      },
      {
        letter: "K.",
        title: "Event Loop",
        description: "Close the loop by converting event data into better circular operations.",
      },
      {
        letter: "L.",
        title: "Objects with Soul",
        description: "Build emotional attachment through responsible design and meaningful service.",
      },
      {
        letter: "M.",
        title: "Co-Creation Services",
        description: "Invite customers and partners into the process to improve fit and impact.",
      },
    ],
    [],
  );

  const [openLetter, setOpenLetter] = useState<string | null>("A.");

  return (
    <div className="min-h-screen screen-breathe screen-breathe-challenges text-foreground">
      <main className="stagger mx-auto flex w-full max-w-3xl flex-col px-6 pb-16 pt-6 sm:px-8 sm:pt-8">
        <header className="stagger-item text-center" style={stagger(0)}>
          <h1 className="text-4xl font-semibold tracking-tight">The Challenge</h1>
          <p className="mt-6 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
            You will work in groups. Each group will choose one challenge.
          </p>
        </header>

        <section
          className="stagger-item mt-8 rounded-2xl bg-tint px-6 py-6"
          style={stagger(1)}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Rules
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/80">
            <li>Each challenge can only be selected by one group.</li>
            <li>
              If a group has a strong reason (such as prior experience or access to industry
              context), they can propose a specific challenge. For example, one of the challenges
              is related to trade fairs.
            </li>
          </ul>
        </section>

        <section
          className="stagger-item mt-6 text-center"
          style={stagger(2)}
        >
          <p className="text-base leading-7 text-foreground/80">
            The logic behind many of these challenges relates to the circular economy and
            servitization services. These concepts might not sound familiar to you yet, but
            don&apos;t worry—we&apos;ll cover them in class.
          </p>
          <p className="mt-4 text-base leading-7 text-foreground/80">
            If your group doesn&apos;t have a good reason to choose a specific challenge, don&apos;t
            worry; one will be randomly assigned to you. On the first day, I will ask you to
            tell me which three challenges your group is best prepared for.
          </p>
        </section>

        <section
          className="stagger-item mt-10"
          style={stagger(3)}
        >
          <div className="flex flex-col gap-3">
            {challenges.map((c) => {
              const isOpen = openLetter === c.letter;
              const contentId = `challenge-${c.letter.replace(".", "")}-content`;

              return (
                <div key={c.letter} className="rounded-xl border border-foreground/10 bg-foreground/[0.02]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setOpenLetter(isOpen ? null : c.letter)}
                  >
                    <span className="text-sm font-semibold tracking-wide text-foreground/90">
                      {c.letter} {c.title}
                    </span>
                    <span className="text-sm font-semibold text-foreground/50">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen ? (
                    <div id={contentId} className="px-5 pb-5 text-sm leading-6 text-foreground/80">
                      {c.description}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

