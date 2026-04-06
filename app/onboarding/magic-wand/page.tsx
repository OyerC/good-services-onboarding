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
            This course is not only about what you build.
            <br />
            It is also about who you become while building it.
          </p>

          <p>
            Throughout the course, you will have the opportunity to work on something more
            personal.
          </p>

          <div className="space-y-2">
            <p>A habit.</p>
            <p>A behavior.</p>
            <p>A way of working that you know you could improve.</p>
          </div>

          <p>We call it the Magic Wand.</p>

          <p>It is completely optional. It does not affect your grade.</p>

          <p>This is a personal, introspective layer of the course.</p>

          <p>The goal is not external performance. It is internal change.</p>

          <p>
            This course is designed to be a Good Service for you. And a Good Service has the
            potential to transform.
          </p>

          <p>Not because someone tells you what to change. But because you decide to work on it.</p>

          <div className="space-y-2">
            <p>After each session, you can reflect on:</p>
            <p>- what you have learned</p>
            <p>- how you behaved</p>
            <p>- what you would like to improve</p>
          </div>

          <p>You can use tools like ChatGPT to support that reflection.</p>

          <p>This work is yours. You do not need to share it.</p>

          <p>If you use it well, it will directly improve your Learning Journal.</p>
        </div>

        <section
          className="stagger-item mt-12 rounded-2xl border border-foreground/10 bg-tint px-6 py-10 sm:px-8"
          style={stagger(2)}
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
            Reflection prompt
          </p>
          <p className="mt-4 text-2xl font-semibold leading-9 tracking-tight text-primary sm:text-[1.75rem]">
            If you had a magic wand… what would you choose to change about how you work?
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
