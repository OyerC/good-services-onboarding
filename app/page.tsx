import CourseAssistantClient from "./components/CourseAssistantClient";
import GoodServicesCircleLogo from "./components/GoodServicesCircleLogo";
import MobileSwipeNav from "./components/MobileSwipeNav";
import OnboardingTopNav from "./components/OnboardingTopNav";
import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

export default function Home() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-welcome text-foreground">
      <MobileSwipeNav prevHref={null} nextHref="/onboarding/client" />
      <OnboardingTopNav
        backHref={null}
        forwardHref="/onboarding/client"
        forwardLabel="Meet the client"
        showForwardArrow
      />
      <main className="stagger mx-auto flex min-h-[calc(100dvh-1px)] w-full max-w-xl flex-col items-center justify-center px-6 pb-16 pt-[calc(3.75rem+env(safe-area-inset-top))] text-center sm:pt-[calc(4.25rem+env(safe-area-inset-top))]">
        <div className="stagger-item px-2" style={stagger(0)}>
          <GoodServicesCircleLogo size={240} />
        </div>
        <h1
          className="stagger-item mt-4 text-4xl font-semibold tracking-tight"
          style={stagger(1)}
        >
          GOOD SERVICES
        </h1>
        <h2
          className="stagger-item mt-2 text-lg font-medium text-foreground/80"
          style={stagger(2)}
        >
          IE Business School
        </h2>

        <p
          className="stagger-item mt-6 max-w-prose text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(3)}
        >
          Master in Creative Direction, Content &amp; Branding
          <br />
          <br />
          This course is about designing services that work in the real world, and are good for
          the planet.
        </p>
      </main>
      <CourseAssistantClient />
    </div>
  );
}
