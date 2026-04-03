import Link from "next/link";

export default function ClientScreen() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          The Client
        </h1>
        <h2 className="mt-2 text-lg font-medium text-foreground/80">
          Nagami.design
        </h2>

        <p className="mt-8 max-w-prose text-base leading-7 text-foreground/80">
          You will work with a real company. Nagami designs and manufactures
          furniture using advanced technologies such as robotic 3D printing.
        </p>

        <p className="mt-5 max-w-prose text-base leading-7 text-foreground/80">
          This is not a fictional case. You are stepping into a real context
          with real constraints. And furthermore, this Real Client will come
          to our first class.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center rounded-2xl bg-foreground/[0.06] px-6 py-14">
          <div className="text-sm font-semibold tracking-wide text-foreground/70">
            Nagami Video
          </div>
          <a
            className="mt-4 text-sm text-foreground/60 underline underline-offset-4 hover:text-foreground"
            href="https://www.youtube.com/watch?v=tzYJSbKhLzU"
            target="_blank"
            rel="noreferrer"
          >
            https://www.youtube.com/watch?v=tzYJSbKhLzU
          </a>
        </div>

        <Link
          href="/onboarding/challenges"
          className="mt-12 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background font-semibold transition-colors hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/30"
        >
          Next
        </Link>
      </main>
    </div>
  );
}

