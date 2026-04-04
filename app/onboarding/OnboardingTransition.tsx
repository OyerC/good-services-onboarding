"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function OnboardingTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const current = pathname ?? "";
    const prev = prevPathnameRef.current;

    if (prev === null) {
      prevPathnameRef.current = current;
      return;
    }

    if (prev === current) return;

    prevPathnameRef.current = current;

    if (!el) return;

    el.classList.remove("onboarding-enter");
    void el.offsetWidth;
    el.classList.add("onboarding-enter");
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="onboarding-enter will-change-transform will-change-opacity motion-reduce:animate-none"
    >
      {children}
    </div>
  );
}
