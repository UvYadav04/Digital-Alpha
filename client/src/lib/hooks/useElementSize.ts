"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Measures an element's rendered size (via ResizeObserver) so layout that
 * depends on another element's actual height — e.g. a sticky offset below a
 * filter bar that can change height across breakpoints — stays correct
 * instead of relying on a hardcoded pixel value.
 */
export function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
