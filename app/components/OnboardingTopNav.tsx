import Link from "next/link";

const IE_BLUE = "#003A8F";

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type OnboardingTopNavProps = {
  backHref: string | null;
  forwardHref: string;
  forwardLabel: string;
  showForwardArrow?: boolean;
};

export default function OnboardingTopNav({
  backHref,
  forwardHref,
  forwardLabel,
  showForwardArrow = true,
}: OnboardingTopNavProps) {
  return (
    <nav
      className="fixed left-0 right-0 top-0 z-30 bg-transparent"
      style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
    >
      <div className="mx-auto flex h-12 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:h-14 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-transparent transition-colors hover:bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
              style={{ borderColor: IE_BLUE, color: IE_BLUE }}
              aria-label="Back"
            >
              <ArrowLeftIcon />
            </Link>
          ) : (
            <span className="block h-10 w-10" aria-hidden />
          )}
        </div>

        <Link
          href={forwardHref}
          className="inline-flex max-w-[min(100%,16rem)] items-center gap-1.5 rounded-full border bg-transparent px-4 py-2 text-right text-sm font-semibold transition-colors hover:bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 sm:max-w-none sm:text-base"
          style={{ borderColor: IE_BLUE, color: IE_BLUE, outlineColor: IE_BLUE }}
        >
          <span className="leading-snug">{forwardLabel}</span>
          {showForwardArrow ? <ArrowRightIcon /> : null}
        </Link>
      </div>
    </nav>
  );
}
