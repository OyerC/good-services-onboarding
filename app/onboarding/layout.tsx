import CourseAssistantClient from "../components/CourseAssistantClient";
import OnboardingNavBar from "./OnboardingNavBar";
import OnboardingTransition from "./OnboardingTransition";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OnboardingNavBar />
      <div className="pt-[calc(3.75rem+env(safe-area-inset-top))] sm:pt-[calc(4.25rem+env(safe-area-inset-top))]">
        <OnboardingTransition>{children}</OnboardingTransition>
      </div>
      <CourseAssistantClient />
    </>
  );
}

