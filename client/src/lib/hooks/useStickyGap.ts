"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Measures the real vertical gap (in px) between the top of `fromRef` and the
 * top of `toRef`, so a sticky element can offset itself to sit flush below
 * another sticky element — regardless of padding, flex gaps, or conditional
 * content in between, which a fixed pixel value or a single element's own
 * height can't account for.
 */
export function useStickyGap(
  fromRef: RefObject<HTMLElement | null>,
  toRef: RefObject<HTMLElement | null>,
  fallback = 52,
) {
  const [gap, setGap] = useState(fallback);

  useEffect(() => {
    function measure() {
      const fromEl = fromRef.current;
      const toEl = toRef.current;
      if (!fromEl || !toEl) return;
      const diff = toEl.getBoundingClientRect().top - fromEl.getBoundingClientRect().top;
      if (diff > 0) setGap(diff);
    }

    measure();

    const observer = new ResizeObserver(measure);
    if (fromRef.current) observer.observe(fromRef.current);
    if (toRef.current) observer.observe(toRef.current);

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [fromRef, toRef]);

  return gap;
}
