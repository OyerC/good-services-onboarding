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
        description:
          "Designing a real-time creation experience in nightlife environments such as clubs in Ibiza, Marbella, or Miami. The focus is on turning design and fabrication into a live, social experience, where users interact with the process and later receive the produced object. Relevant contexts: nightlife, events, experiential design, user interaction in social environments.",
      },
      {
        letter: "B.",
        title: "Nagami on Wheels",
        description:
          "A mobile version of Nagami’s studio that brings design and fabrication to universities, companies, fairs, or underserved territories. The focus is not just demonstration, but activation: workshops, participation, and engagement. Relevant contexts: education, events, outreach, community activation, mobile experiences.",
      },
      {
        letter: "C.",
        title: "Material Rebirth",
        description:
          "Transforming damaged objects into unique pieces using Nagami materials, inspired by the philosophy of kintsugi. The challenge is to redesign repair as something meaningful, visible, and valuable. Relevant contexts: sustainability, repair culture, emotional design, circular economy.",
      },
      {
        letter: "D.",
        title: "Space as a Service",
        description:
          "Moving from designing objects to designing complete spatial experiences: entrances, flows, atmospheres, and identity. The challenge is to think in terms of how people move, perceive, and interact within a space. Relevant contexts: architecture, retail, exhibitions, spatial storytelling.",
      },
      {
        letter: "E.",
        title: "Modular Spaces for Events & Fairs",
        description:
          "Designing modular systems for stands, installations, and temporary spaces that can be reused and adapted over time. The goal is to turn one-off installations into evolving assets. Relevant contexts: trade fairs, events, exhibitions, temporary architecture.",
      },
      {
        letter: "F.",
        title: "Urban Boundaries",
        description:
          "Redefining urban outdoor spaces through Nagami structures that shape terraces and public areas. The focus is on creating identity and presence in the city through form and structure. Relevant contexts: urban design, hospitality, public space, city experience.",
      },
      {
        letter: "G.",
        title: "B2B Circular Display",
        description:
          "A subscription-based model where brands access display elements previously used by high-end clients. The challenge is to rethink reuse as a premium, desirable system. Relevant contexts: retail, branding, sustainability, B2B services.",
      },
      {
        letter: "H.",
        title: "Queue as a Service",
        description:
          "Transforming waiting time into an experience that creates value instead of frustration. The challenge is to redesign how people wait in contexts such as retail, museums, or events. Relevant contexts: service design, customer experience, public interaction.",
      },
      {
        letter: "I.",
        title: "Nagami Experience Lab",
        description:
          "An immersive experience in Ávila where teams co-design and produce with Nagami. The focus is on combining process, place, and learning into a meaningful experience. Relevant contexts: experiential learning, workshops, B2B experiences.",
      },
      {
        letter: "J.",
        title: "Nagami Rotation Club",
        description:
          "A subscription model where users access rotating pieces instead of owning them. The challenge is to design a system based on access, not ownership. Relevant contexts: subscription services, product-service systems, circular economy.",
      },
      {
        letter: "K.",
        title: "Nagami as a Service",
        description:
          "A model where companies access furniture as a service, including installation, maintenance, and updates. The focus is on long-term relationships instead of one-time transactions. Relevant contexts: B2B services, leasing models, lifecycle design.",
      },
      {
        letter: "L.",
        title: "Event Loop",
        description:
          "A system where objects accumulate history across different events. The value lies not only in the object, but in the story it carries. Relevant contexts: storytelling, events, brand experience, narrative design.",
      },
      {
        letter: "M.",
        title: "Objects with Soul",
        description:
          "Tracking the history of each object: origin, use, and ownership. The goal is to connect design with emotional and cultural value. Relevant contexts: traceability, sustainability, emotional design.",
      },
      {
        letter: "N.",
        title: "Co-Creation Services",
        description:
          "Allowing clients to actively participate in the design process. The focus is on turning design into a shared experience rather than a delivered product. Relevant contexts: co-creation, participatory design, client engagement.",
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
            You will work in groups. Each group will work on one challenge.
          </p>
        </header>

        <section className="stagger-item mt-8 rounded-2xl bg-tint px-6 py-6" style={stagger(1)}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Rules
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground/80">
            <li>Each challenge can only be assigned to one group.</li>
            <li>
              If your group has a strong reason, you can propose a specific challenge. A strong
              reason means real access to context: experience, contacts, or direct knowledge.
            </li>
            <li>
              If you do not have a strong reason, a challenge will be assigned. On the first day,
              each group will indicate which three challenges they are best positioned to work on.
            </li>
          </ul>
        </section>

        <section className="stagger-item mt-6 text-center" style={stagger(2)}>
          <p className="text-base leading-7 text-foreground/80">
            Choosing a challenge is not about preference. It is about access to real context—who
            you know, what you can observe, and where you can get insight (not assumptions).
          </p>
          <p className="mt-4 text-base leading-7 text-foreground/80">
            Many of these challenges relate to circular economy and service-based models. You do
            not need to understand these concepts yet—we will work on them together during the
            course.
          </p>
        </section>

        <section className="stagger-item mt-10" style={stagger(3)}>
          <div className="flex flex-col gap-3">
            {challenges.map((c) => {
              const isOpen = openLetter === c.letter;
              const contentId = `challenge-${c.letter.replace(".", "")}-content`;

              return (
                <div
                  key={c.letter}
                  className="rounded-xl border border-foreground/10 bg-foreground/[0.02]"
                >
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

