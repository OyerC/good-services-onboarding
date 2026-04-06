"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type MobileSwipeNavProps = {
  prevHref: string | null;
  nextHref: string | null;
};

const EDGE_GESTURE_GUARD_PX = 24;
const HORIZONTAL_LOCK_THRESHOLD_PX = 10;
const MIN_SWIPE_DISTANCE_PX = 70;
const MIN_SWIPE_VELOCITY_PX_PER_MS = 0.35;
const MAX_SWIPE_DURATION_MS = 650;
const HORIZONTAL_INTENT_RATIO = 1.4;

function isMobileTouchEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const noHover = window.matchMedia?.("(hover: none)")?.matches ?? false;
  const touchPoints = navigator.maxTouchPoints ?? 0;
  const hasTouch =
    touchPoints > 0 || "ontouchstart" in window || (navigator as any).msMaxTouchPoints > 0;
  const smallViewport = (window.innerWidth ?? 1024) < 900;
  return (hasTouch && (coarse || noHover)) || (hasTouch && smallViewport);
}

function isFromInteractiveElement(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return Boolean(el.closest("a,button,input,textarea,select,label,[role='button']"));
}

export default function MobileSwipeNav({ prevHref, nextHref }: MobileSwipeNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const stateRef = useRef<{
    active: boolean;
    horizontalIntent: boolean;
    cancelled: boolean;
    startX: number;
    startY: number;
    startT: number;
    lastX: number;
    lastY: number;
    lastT: number;
    width: number;
  }>({
    active: false,
    horizontalIntent: false,
    cancelled: false,
    startX: 0,
    startY: 0,
    startT: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    width: 0,
  });

  useEffect(() => {
    if (!isMobileTouchEnvironment()) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (isFromInteractiveElement(e.target)) return;

      const t = e.touches[0];
      const now = performance.now();
      stateRef.current = {
        active: true,
        horizontalIntent: false,
        cancelled: false,
        startX: t.clientX,
        startY: t.clientY,
        startT: now,
        lastX: t.clientX,
        lastY: t.clientY,
        lastT: now,
        width: window.innerWidth ?? 0,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = stateRef.current;
      if (!s.active || s.cancelled) return;
      if (e.touches.length !== 1) return;

      const t = e.touches[0];
      const now = performance.now();
      s.lastX = t.clientX;
      s.lastY = t.clientY;
      s.lastT = now;

      const dx = s.lastX - s.startX;
      const dy = s.lastY - s.startY;

      if (!s.horizontalIntent) {
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);

        if (ady > adx) {
          // Let vertical scroll happen naturally.
          return;
        }

        if (adx >= HORIZONTAL_LOCK_THRESHOLD_PX && adx > ady * HORIZONTAL_INTENT_RATIO) {
          // Avoid hijacking native edge back gesture on iOS.
          if (dx > 0 && s.startX < EDGE_GESTURE_GUARD_PX) {
            s.cancelled = true;
            return;
          }
          s.horizontalIntent = true;
        }
      }

      if (s.horizontalIntent) {
        // Once we're sure it's a horizontal swipe, prevent accidental page scroll jitter.
        e.preventDefault();
      }
    };

    const onTouchEnd = () => {
      const s = stateRef.current;
      if (!s.active) return;

      const dx = s.lastX - s.startX;
      const dy = s.lastY - s.startY;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const dt = Math.max(1, s.lastT - s.startT);

      s.active = false;

      if (s.cancelled || !s.horizontalIntent) return;
      if (adx <= ady * HORIZONTAL_INTENT_RATIO) return;
      if (dt > MAX_SWIPE_DURATION_MS) return;

      const velocity = adx / dt; // px/ms
      const distanceOk = adx >= MIN_SWIPE_DISTANCE_PX;
      const velocityOk = velocity >= MIN_SWIPE_VELOCITY_PX_PER_MS;

      if (!distanceOk && !velocityOk) return;

      if (dx < 0 && nextHref) router.push(nextHref);
      if (dx > 0 && prevHref) router.push(prevHref);
    };

    const onTouchCancel = () => {
      stateRef.current.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      if (isFromInteractiveElement(e.target)) return;
      const now = performance.now();
      stateRef.current = {
        active: true,
        horizontalIntent: false,
        cancelled: false,
        startX: e.clientX,
        startY: e.clientY,
        startT: now,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: now,
        width: window.innerWidth ?? 0,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.active || s.cancelled) return;
      if (e.pointerType !== "touch") return;

      const now = performance.now();
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.lastT = now;

      const dx = s.lastX - s.startX;
      const dy = s.lastY - s.startY;

      if (!s.horizontalIntent) {
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);
        if (ady > adx) return;

        if (adx >= HORIZONTAL_LOCK_THRESHOLD_PX && adx > ady * HORIZONTAL_INTENT_RATIO) {
          if (dx > 0 && s.startX < EDGE_GESTURE_GUARD_PX) {
            s.cancelled = true;
            return;
          }
          s.horizontalIntent = true;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.active) return;
      if (e.pointerType !== "touch") return;

      const dx = s.lastX - s.startX;
      const dy = s.lastY - s.startY;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      const dt = Math.max(1, s.lastT - s.startT);

      s.active = false;

      if (s.cancelled || !s.horizontalIntent) return;
      if (adx <= ady * HORIZONTAL_INTENT_RATIO) return;
      if (dt > MAX_SWIPE_DURATION_MS) return;

      const velocity = adx / dt;
      const distanceOk = adx >= MIN_SWIPE_DISTANCE_PX;
      const velocityOk = velocity >= MIN_SWIPE_VELOCITY_PX_PER_MS;
      if (!distanceOk && !velocityOk) return;

      if (dx < 0 && nextHref) router.push(nextHref);
      if (dx > 0 && prevHref) router.push(prevHref);
    };

    const target = document;

    target.addEventListener("touchstart", onTouchStart, { passive: true });
    target.addEventListener("touchmove", onTouchMove, { passive: false });
    target.addEventListener("touchend", onTouchEnd, { passive: true });
    target.addEventListener("touchcancel", onTouchCancel, { passive: true });

    target.addEventListener("pointerdown", onPointerDown, { passive: true });
    target.addEventListener("pointermove", onPointerMove, { passive: true });
    target.addEventListener("pointerup", onPointerUp, { passive: true });
    target.addEventListener("pointercancel", onTouchCancel, { passive: true });

    return () => {
      target.removeEventListener("touchstart", onTouchStart);
      target.removeEventListener("touchmove", onTouchMove);
      target.removeEventListener("touchend", onTouchEnd);
      target.removeEventListener("touchcancel", onTouchCancel);

      target.removeEventListener("pointerdown", onPointerDown);
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerup", onPointerUp);
      target.removeEventListener("pointercancel", onTouchCancel);
    };
  }, [router, prevHref, nextHref, pathname]);

  return null;
}

