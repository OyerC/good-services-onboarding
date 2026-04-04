/**
 * Fixed course answers (plain text only). Used before any LLM call.
 * Matching is case-insensitive; accents are stripped for robustness.
 */

export function normalizeMessage(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

const R = {
  howToChooseChallenge: `Choose a challenge based on access to real context, not personal preference.

All challenges belong to the same client, Nagami. The decision is not about which one you like more, but which one your group can actually work with in a meaningful way.

A strong reason to choose a challenge means having access to people, knowledge or experience related to that context. If you do not have a strong reason, the challenge will be assigned.`,

  mandatoryChallenge: `Yes. Each group will work on one challenge.

Challenges cannot be repeated across groups. If your group has a strong reason to request a specific challenge, you can propose it. Otherwise, challenges will be assigned.`,

  sameChallengeTwoGroups: `No. Each challenge will be assigned to only one group.

This is intentional. It forces each group to go deeper into their context instead of competing on the same problem.`,

  strongReason: `A strong reason is not preference.

It means having real access to context. For example: knowing people in that industry, having worked in a similar environment, or having direct access to users or stakeholders.

If your choice does not improve your ability to understand reality, it is not a strong reason.`,

  magicWandGrade: `No. The Magic Wand is optional and does not affect your grade.

It is a personal layer of the course. You decide whether to use it or not.`,

  whatIsMagicWand: `The Magic Wand is an opportunity to work on something personal during the course.

Not something external. Something about how you work.

A habit, a behavior, or a way of thinking that you know you could improve.`,

  howPersonalMagicWand: `As personal as you want, but always relevant to how you work.

This is not therapy. It is about improving how you operate in real situations: working with others, dealing with uncertainty, making decisions, taking responsibility.`,

  chooseWhatToImprove: `Choose something that you already know is limiting you.

Do not choose something abstract or aspirational. Choose something you have already experienced as a difficulty.

If nothing comes to mind, pay attention during the first sessions. It will become clear.`,

  ignoreMagicWand: `Yes. It is optional.

But if you ignore it, you are leaving part of the value of the course unused.`,

  evaluationAndGrade: `Your evaluation is based on three things:

your work and participation during the course,
the final project developed for Nagami,
and your ability to engage with the process.

The Magic Wand is not part of the grading, but it can influence how much you actually learn.`,

  expectedFromStudents: `You are expected to engage with real constraints.

This is not a theoretical exercise. You are working with a real context, with real limitations, and with decisions that have consequences.`,

  kindOfCourse: `This is not a course about learning frameworks.

It is about learning how to design services that work in reality.

That means dealing with ambiguity, making decisions, and working with imperfect information.`,

  prepareBeforeFirstClass: `Nothing specific.

But come ready to make decisions, work with others, and question your assumptions.`,

  whatNagamiDoes: `Nagami is a company that designs and manufactures furniture using advanced technologies such as robotic 3D printing.

In this course, they are not just a reference. They are the real context you will work with.`,

  feelingLost: `That is part of the course.

The goal is not to remove uncertainty, but to learn how to operate within it.`,

  personalAboutOyer: `In reality, I am not Oyer Corazon. I am an AI assistant designed to support this course. You should ask him directly for personal questions.`,
} as const;

type Matcher = { test: (t: string, raw: string) => boolean; reply: string };

const matchers: Matcher[] = [
  {
    test: (t) =>
      /\boyer\b/.test(t) &&
      (t.includes("personal") ||
        t.includes("private") ||
        t.includes("pregunta personal") ||
        t.includes("about him") ||
        t.includes("contact oyer") ||
        t.includes("email oyer") ||
        (t.includes("talk to") && t.includes("oyer"))),
    reply: R.personalAboutOyer,
  },
  {
    test: (t) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      if (!mw) return false;
      return (
        /\bgrade\b/.test(t) ||
        t.includes("grading") ||
        t.includes("nota") ||
        t.includes("calificacion") ||
        t.includes("gpa") ||
        (t.includes("affect") && (t.includes("grade") || t.includes("nota"))) ||
        t.includes("count toward") ||
        t.includes("counts for")
      );
    },
    reply: R.magicWandGrade,
  },
  {
    test: (t) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      if (!mw) return false;
      return (
        /\bwhat\s+is\b/.test(t) ||
        /\bwhat's\b/.test(t) ||
        t.includes("whats the magic") ||
        (t.includes("define") && t.includes("magic")) ||
        (t.includes("explain") && t.includes("magic")) ||
        t.includes("que es el magic") ||
        t.includes("que es la magic") ||
        t.includes("tell me about the magic")
      );
    },
    reply: R.whatIsMagicWand,
  },
  {
    test: (t) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      if (!mw) return false;
      return (
        t.includes("how personal") ||
        t.includes("therapy") ||
        t.includes("too personal") ||
        t.includes("should it be personal")
      );
    },
    reply: R.howPersonalMagicWand,
  },
  {
    test: (t) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      if (!mw) return false;
      return (
        t.includes("limiting") ||
        t.includes("what to improve") ||
        (t.includes("abstract") && t.includes("aspirational")) ||
        t.includes("experienced as a difficulty") ||
        (t.includes("choose") && t.includes("improve") && t.includes("magic"))
      );
    },
    reply: R.chooseWhatToImprove,
  },
  {
    test: (t) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      if (!mw) return false;
      return (
        t.includes("ignore") ||
        t.includes("skip") ||
        t.includes("can i skip") ||
        (t.includes("don't use") && t.includes("magic")) ||
        (t.includes("not use") && t.includes("magic"))
      );
    },
    reply: R.ignoreMagicWand,
  },
  {
    test: (t) =>
      t.includes("evaluat") ||
      t.includes("final grade") ||
      t.includes("what counts for") ||
      t.includes("what is graded") ||
      t.includes("what will be graded") ||
      t.includes("assessment") ||
      (t.includes("grade") &&
        (t.includes("based on") ||
          t.includes("final project") ||
          t.includes("participation") ||
          t.includes("three things"))),
    reply: R.evaluationAndGrade,
  },
  {
    test: (t) =>
      t.includes("expected from") ||
      t.includes("what do you expect") ||
      t.includes("what should we") ||
      t.includes("what are students expected") ||
      t.includes("que se espera"),
    reply: R.expectedFromStudents,
  },
  {
    test: (t) =>
      t.includes("what kind of course") ||
      t.includes("type of course") ||
      (t.includes("framework") && t.includes("course")) ||
      (t.includes("course") && t.includes("theoretical")),
    reply: R.kindOfCourse,
  },
  {
    test: (t) =>
      t.includes("first class") ||
      t.includes("first day") ||
      t.includes("before the course") ||
      t.includes("antes de la primera") ||
      (t.includes("prepare") &&
        (t.includes("first") || t.includes("class") || t.includes("day") || t.includes("session"))),
    reply: R.prepareBeforeFirstClass,
  },
  {
    test: (t) =>
      /\bnagami\b/.test(t) ||
      t.includes("what is nagami") ||
      t.includes("who is nagami") ||
      t.includes("tell me about nagami"),
    reply: R.whatNagamiDoes,
  },
  {
    test: (t) =>
      t.includes("lost") ||
      t.includes("confused") ||
      t.includes("overwhelmed") ||
      (t.includes("uncertain") && (t.includes("feel") || t.includes("i am"))) ||
      t.includes("don't know what to do") ||
      t.includes("no se que hacer"),
    reply: R.feelingLost,
  },
  {
    test: (t) =>
      (/\bchallenge\b/.test(t) || t.includes("desafio") || t.includes("reto")) &&
      (t.includes("two group") ||
        t.includes("same challenge") ||
        t.includes("more than one group") ||
        t.includes("multiple group") ||
        (t.includes("repeat") && t.includes("challenge")) ||
        t.includes("dos grupos") ||
        t.includes("mismo desafio")),
    reply: R.sameChallengeTwoGroups,
  },
  {
    test: (t) =>
      (/\bchallenge\b/.test(t) || t.includes("desafio") || t.includes("reto")) &&
      !/\bmagic\s*wand\b/.test(t) &&
      (t.includes("mandatory") ||
        t.includes("obligatory") ||
        t.includes("obligatorio") ||
        t.includes("have to choose") ||
        t.includes("must i choose") ||
        t.includes("required to pick")),
    reply: R.mandatoryChallenge,
  },
  {
    test: (t) =>
      t.includes("strong reason") ||
      (t.includes("what counts") && t.includes("strong")) ||
      (t.includes("not preference") && (/\bchallenge\b/.test(t) || t.includes("reason"))),
    reply: R.strongReason,
  },
  {
    test: (t) =>
      (/\bchallenge\b/.test(t) || t.includes("desafio") || t.includes("reto")) &&
      ((/\bhow\b/.test(t) &&
        (t.includes("choose") || t.includes("pick") || t.includes("select") || t.includes("elegir"))) ||
        t.includes("which challenge") ||
        t.includes("how should i pick")),
    reply: R.howToChooseChallenge,
  },
  {
    test: (t, raw) => {
      const mw =
        /\bmagic\s*wand\b/.test(t) ||
        t.includes("magic wand") ||
        t.includes("varita magica");
      return mw && raw.length < 85 && !/\bchallenge\b/.test(t) && !/\bhow\b/.test(t);
    },
    reply: R.whatIsMagicWand,
  },
];

export function getFixedCourseResponse(message: string): string | null {
  const trimmed = message.trim();
  if (!trimmed) return null;

  const t = normalizeMessage(trimmed);

  for (const { test, reply } of matchers) {
    if (test(t, trimmed)) return reply;
  }

  return null;
}
