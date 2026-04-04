"use client";

import dynamic from "next/dynamic";

/**
 * CourseAssistant is loaded only on the client (no SSR subtree).
 * The floating button + modal previously participated in hydration; paired with
 * env(safe-area-inset-*) positioning and other client-only layout, that led to
 * server/client HTML mismatches on refresh. Rendering the assistant after
 * hydration removes that subtree from the SSR pass entirely.
 */
const CourseAssistant = dynamic(() => import("./CourseAssistant"), {
  ssr: false,
  loading: () => null,
});

export default function CourseAssistantClient() {
  return <CourseAssistant />;
}
