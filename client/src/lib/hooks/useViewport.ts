"use client";

import { useEffect, useState } from "react";

const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const;

export type DeviceType = "mobile" | "tablet" | "desktop";

function getDeviceType(width: number): DeviceType {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}

/**
 * Tracks the viewport width and classifies it into mobile / tablet / desktop,
 * so components can branch on device type in JS (not just hide/show via CSS).
 */
export function useViewport() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Default to desktop until mounted, to keep the initial server-rendered markup stable.
  const device: DeviceType = width === null ? "desktop" : getDeviceType(width);

  return {
    width,
    device,
    isMobile: device === "mobile",
    isTab: device === "tablet",
    isWeb: device === "desktop",
  };
}
