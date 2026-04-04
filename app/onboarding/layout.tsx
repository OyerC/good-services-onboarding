import CourseAssistantClient from "../components/CourseAssistantClient";
import OnboardingTransition from "./OnboardingTransition";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OnboardingTransition>{children}</OnboardingTransition>
      <CourseAssistantClient />
    </>
  );
}

