import OnboardingTransition from "./OnboardingTransition";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnboardingTransition>{children}</OnboardingTransition>;
}

