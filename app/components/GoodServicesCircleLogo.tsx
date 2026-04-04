"use client";

import { useId, useSyncExternalStore } from "react";

const IE_BLUE = "#003A8F";

const WORDS = ["good", "services", "good", "services"] as const;
const CHARS_PER_WORD = [4, 7, 4, 7] as const;
const TOTAL_CHARS = CHARS_PER_WORD.reduce((a, b) => a + b, 0);
/** Huecos entre letras dentro de las palabras (3+6+3+6). */
const LETTER_GAPS_COUNT = CHARS_PER_WORD.reduce(
  (sum, n) => sum + Math.max(0, n - 1),
  0,
);
/** Solo para el arco de referencia (igual que antes: 34 % del perímetro a huecos entre palabras). */
const WORD_GAP_FRACTION_REF = 0.34;
/**
 * Parte del arco de palabras atribuida a anchura de glifos; el resto reparte los huecos entre letras (18).
 * Con esto se obtiene `s` (espacio entre letras) coherente con el layout anterior.
 */
const GLYPH_FRACTION_OF_WORD_ARC = 0.72;

/** Una vuelta completa: antihorario, lento. */
const ROTATION_SECONDS = 120;

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export type GoodServicesCircleLogoProps = {
  className?: string;
  size?: number;
};

export default function GoodServicesCircleLogo({
  className = "",
  size = 220,
}: GoodServicesCircleLogoProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const pathId = `gs-circle-${uid}`;
  const reduceMotion = usePrefersReducedMotion();

  const vb = 100;
  const cx = vb / 2;
  const cy = vb / 2;
  const fontSize = 4.35 * 4 * 0.8 * 0.65;

  const rRef = 41 * 0.8;
  const circumferenceRef = 2 * Math.PI * rRef;
  /** Arco total que ocupaban las palabras con el diseño anterior (misma “densidad” de letras). */
  const wordArcTotalRef =
    circumferenceRef * (1 - WORD_GAP_FRACTION_REF);

  /**
   * Modelo lineal: arco palabra = n·w_c + (n−1)·s; suma palabras = 22·w_c + 18·s = wordArcTotalRef.
   * w_c y s se fijan para reproducir `wordArcTotalRef` en suma; luego hueco entre palabras = 2s.
   */
  const w_c = (GLYPH_FRACTION_OF_WORD_ARC * wordArcTotalRef) / TOTAL_CHARS;
  const letterGapArc =
    (wordArcTotalRef - TOTAL_CHARS * w_c) / LETTER_GAPS_COUNT;
  const gapEach = 2 * letterGapArc;
  const circumference = wordArcTotalRef + 4 * gapEach;
  const r = circumference / (2 * Math.PI);

  const wordArcs = CHARS_PER_WORD.map(
    (n) => n * w_c + (n - 1) * letterGapArc,
  );

  const segments = WORDS.map((word, i) => {
    const start = wordArcs
      .slice(0, i)
      .reduce((sum, arc) => sum + arc + gapEach, 0);
    return { word, start, length: wordArcs[i] };
  });

  const pathD = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;

  const textProps = {
    fill: IE_BLUE,
    fontSize,
    fontWeight: 700 as const,
    className:
      "[font-family:var(--font-montserrat-alternates),system-ui,sans-serif]",
  };

  return (
    <div
      className={`mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] ${className}`}
      style={{
        aspectRatio: "1",
        maxWidth: size,
      }}
    >
      <svg
        viewBox={`0 0 ${vb} ${vb}`}
        className="block h-auto w-full select-none"
        style={{
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
        }}
        role="img"
        aria-label="good services good services"
      >
        <g>
          {!reduceMotion ? (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from={`0 ${cx} ${cy}`}
              to={`-360 ${cx} ${cy}`}
              dur={`${ROTATION_SECONDS}s`}
              repeatCount="indefinite"
            />
          ) : null}
          <defs>
            <path id={pathId} d={pathD} fill="none" />
          </defs>
          {segments.map(({ word, start, length }, i) => (
            <text key={i} {...textProps}>
              <textPath
                href={`#${pathId}`}
                startOffset={start}
                textLength={length}
                lengthAdjust="spacing"
              >
                {word}
              </textPath>
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
