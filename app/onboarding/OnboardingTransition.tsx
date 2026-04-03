"use client";

import { usePathname } from "next/navigation";

export default function OnboardingTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="onboarding-enter will-change-transform will-change-opacity motion-reduce:animate-none"
    >
      {children}
    </div>
  );
}

