import Link from "next/link";
import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

export default function ClientScreen() {
  return (
    <div className="min-h-screen screen-gradient-client text-foreground">
      <main className="stagger mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center">
        <h1
          className="stagger-item text-4xl font-semibold tracking-tight"
          style={stagger(0)}
        >
          The Client
        </h1>
        <h2
          className="stagger-item mt-2 text-lg font-medium text-foreground/80"
          style={stagger(1)}
        >
          Nagami.design
        </h2>

        <p
          className="stagger-item mt-8 max-w-prose text-base leading-7 text-foreground/80"
          style={stagger(2)}
        >
          You will work with a real company. Nagami designs and manufactures
          furniture using advanced technologies such as robotic 3D printing.
        </p>

        <p
          className="stagger-item mt-5 max-w-prose text-base leading-7 text-foreground/80"
          style={stagger(3)}
        >
          This is not a fictional case. You are stepping into a real context
          with real constraints. And furthermore, this Real Client will come
          to our first class.
        </p>

        <section
          className="stagger-item mt-10 w-full"
          style={stagger(4)}
        >
          <div className="mb-3 text-sm font-semibold tracking-wide text-foreground/70">
            Nagami Video
          </div>
          <div className="w-full overflow-hidden rounded-2xl bg-tint shadow-sm ring-1 ring-foreground/10">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/tzYJSbKhLzU?autoplay=1&mute=1&loop=1&playlist=tzYJSbKhLzU&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1"
                title="Nagami Video"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <Link
          href="/onboarding/challenges"
          className="stagger-item mt-12 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-primary-foreground font-semibold shadow-sm transition duration-200 ease-out hover:scale-[1.03] hover:bg-primary/90 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30"
          style={stagger(5)}
        >
          Next
        </Link>
      </main>
    </div>
  );
}

