"use client";

import { usePathname } from "next/navigation";
import OnboardingTopNav from "../components/OnboardingTopNav";

const ROUTES: Record<
  string,
  {
    backHref: string | null;
    forwardHref: string;
    forwardLabel: string;
    showForwardArrow: boolean;
  }
> = {
  "/onboarding/client": {
    backHref: "/",
    forwardHref: "/onboarding/challenges",
    forwardLabel: "Challenges",
    showForwardArrow: true,
  },
  "/onboarding/challenges": {
    backHref: "/onboarding/client",
    forwardHref: "/onboarding/magic-wand",
    forwardLabel: "Magic wand",
    showForwardArrow: true,
  },
  "/onboarding/magic-wand": {
    backHref: "/onboarding/challenges",
    forwardHref: "/",
    forwardLabel: "Back to start",
    showForwardArrow: false,
  },
  "/onboarding/next": {
    backHref: "/onboarding/magic-wand",
    forwardHref: "/",
    forwardLabel: "Back to start",
    showForwardArrow: false,
  },
};

export default function OnboardingNavBar() {
  const pathname = usePathname() ?? "";
  const cfg = ROUTES[pathname];

  if (!cfg) {
    return null;
  }

  return (
    <OnboardingTopNav
      backHref={cfg.backHref}
      forwardHref={cfg.forwardHref}
      forwardLabel={cfg.forwardLabel}
      showForwardArrow={cfg.showForwardArrow}
    />
  );
}
