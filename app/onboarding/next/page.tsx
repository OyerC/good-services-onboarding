import Link from "next/link";

export default function OnboardingNextScreen() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-final text-foreground">
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
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-primary-foreground font-semibold shadow-sm transition duration-200 ease-out hover:scale-[1.03] hover:bg-primary/90 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          Back to start
        </Link>
      </main>
    </div>
  );
}

