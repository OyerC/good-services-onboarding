import type { CSSProperties } from "react";

type StaggerStyle = CSSProperties & { ["--stagger-index"]?: number };
const stagger = (index: number): StaggerStyle => ({ ["--stagger-index"]: index });

export default function MagicWandScreen() {
  return (
    <div className="min-h-screen screen-breathe screen-breathe-magic-wand text-foreground">
      <main className="stagger mx-auto flex w-full max-w-2xl flex-col px-6 pb-20 pt-6 text-center sm:px-8 sm:pt-8">
        <h1
          className="stagger-item text-4xl font-semibold tracking-tight"
          style={stagger(0)}
        >
          The Magic Wand
        </h1>

        <div
          className="stagger-item mt-8 space-y-6 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(1)}
        >
          <p>
            This course is not only about what you build.{" "}
            <br />
            It&apos;s also about who you become while building it.
          </p>

          <p>
            Throughout the course, you&apos;ll have the opportunity to work on something
            more personal.
          </p>

          <div className="space-y-2">
            <p>A skill.</p>
            <p>A habit.</p>
            <p>A way of working that you know you could improve.</p>
          </div>

          <p>We call it the Magic Wand.</p>

          <p>
            It is completely optional. It will not affect your grade in any way.
          </p>

          <p>
            This is a personal, introspective space. Something you do for yourself.
          </p>

          <p>We will explain it properly on the first day.</p>
        </div>

        <section
          className="stagger-item mt-12 rounded-2xl border border-foreground/10 bg-tint px-6 py-10 sm:px-8"
          style={stagger(2)}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Reflection prompt
          </p>
          <p className="mt-4 text-2xl font-semibold leading-9 tracking-tight text-primary sm:text-[1.75rem]">
            If you had a magic wand… what would you choose to change about yourself?
          </p>
        </section>

        <div
          className="stagger-item mt-10 space-y-2 text-base leading-7 text-foreground/80 sm:text-[1.0625rem] sm:leading-8"
          style={stagger(3)}
        >
          <p>For now, you don&apos;t need to do anything.</p>
          <p>Just take a moment and think about it.</p>
        </div>
      </main>
    </div>
  );
}
