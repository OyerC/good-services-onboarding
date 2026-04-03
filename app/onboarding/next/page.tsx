import Link from "next/link";

export default function OnboardingNextScreen() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Ready to start
        </h1>
        <p className="mt-6 max-w-prose text-base leading-7 text-foreground/80">
          This is a placeholder for the next onboarding step. Tell me
          what you want here and I’ll wire it up.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-background font-semibold transition-colors hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/30"
        >
          Back to start
        </Link>
      </main>
    </div>
  );
}

