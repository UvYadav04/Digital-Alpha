"use client";

import { useState } from "react";

export function ChartCarousel({
  slides,
}: {
  slides: { key: string; title: string; content: React.ReactNode }[];
}) {
  const [index, setIndex] = useState(0);
  const active = slides[Math.min(index, slides.length - 1)];

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground/70">{active.title}</h2>
        {slides.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous chart"
              onClick={() => goTo(index - 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-surface-muted"
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === index ? "bg-brand" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next chart"
              onClick={() => goTo(index + 1)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:bg-surface-muted"
            >
              ›
            </button>
          </div>
        )}
      </div>
      <div className="min-h-0 flex-1">{active.content}</div>
    </div>
  );
}
