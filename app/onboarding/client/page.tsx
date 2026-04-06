import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

export default function ClientScreen() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-client text-foreground">
      <main className="stagger mx-auto flex w-full max-w-2xl flex-col items-center px-6 pb-16 pt-6 text-center sm:px-8 sm:pt-8">
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
          className="stagger-item mt-8 max-w-prose text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(2)}
        >
          You will work with a real company. Nagami designs and manufactures furniture using
          advanced technologies such as robotic 3D printing, operating at the intersection of
          design, architecture, and advanced manufacturing.
        </p>

        <p
          className="stagger-item mt-5 max-w-prose text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(3)}
        >
          This is not a fictional brief. You are stepping into a real context, with real
          constraints and real decisions. The client will join us in the first session.
        </p>

        <section className="stagger-item mt-10 w-full" style={stagger(4)}>
          <div className="mb-3 text-sm font-semibold tracking-wide text-foreground/70">
            Nagami Video
          </div>
          <div className="w-full overflow-hidden rounded-2xl border border-foreground/10 bg-tint">
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
      </main>
    </div>
  );
}
