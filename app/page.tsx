import CourseAssistantClient from "./components/CourseAssistantClient";
import Link from "next/link";
import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

export default function Home() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-welcome text-foreground">
      <main className="stagger mx-auto flex w-full max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <h1
          className="stagger-item text-4xl font-semibold tracking-tight"
          style={stagger(0)}
        >
          Good Services
        </h1>
        <h2
          className="stagger-item mt-2 text-lg font-medium text-foreground/80"
          style={stagger(1)}
        >
          IE Business School
        </h2>

        <p
          className="stagger-item mt-6 max-w-prose text-base leading-7 text-foreground/80"
          style={stagger(2)}
        >
          This course is about designing services that work in the real
          world.
        </p>

        <Link
          href="/onboarding/client"
          className="stagger-item mt-10 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-primary-foreground font-semibold shadow-sm transition duration-200 ease-out hover:scale-[1.03] hover:bg-primary/90 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30"
          style={stagger(3)}
        >
          Start
        </Link>
      </main>
      <CourseAssistantClient />
    </div>
  );
}
