export default function OnboardingNextScreen() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-final text-foreground">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-6 pb-16 pt-6 text-center sm:pt-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Ready to start
        </h1>
        <p className="mt-6 max-w-prose text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8">
          This is a placeholder for the next onboarding step. Tell me
          what you want here and I’ll wire it up.
        </p>
      </main>
    </div>
  );
}
