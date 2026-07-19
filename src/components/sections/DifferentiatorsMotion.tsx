"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const headline = "Todo encaja. La obra avanza.";
const headlineLines = [
  { text: "Todo encaja.", steps: 6, delay: "1.75s" },
  { text: "La obra", steps: 4, delay: "2.36s" },
  { text: "avanza.", steps: 4, delay: "2.78s" },
] as const;

export function DifferentiatorsMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setArmed(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    let frame = 0;
    const activate = () => setActive(true);
    const checkPosition = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.86 && rect.bottom > window.innerHeight * 0.08) activate();
    };
    const scheduleCheck = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(checkPosition);
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        activate();
        observer?.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    ) : null;

    observer?.observe(element);
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });
    scheduleCheck();
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setComplete(true), 3600);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <div ref={rootRef} className={cn("differentiators-motion", armed && "motion-armed", active && "motion-active", complete && "motion-complete")}>
      <svg aria-hidden viewBox="0 0 1200 680" preserveAspectRatio="none" className="geometry-overlay pointer-events-none absolute inset-0 z-[1] size-full">
        <g className="geometry-core" fill="none" stroke="currentColor">
          <circle cx="650" cy="332" r="72" />
          <path d="M650 250 720 374 580 374Z" />
          <path d="M550 332h200M650 226v212" />
          <path d="m596 278 108 108M704 278 596 386" />
        </g>

        <g className="geometry-piece geometry-piece-a" fill="none" stroke="currentColor">
          <path d="M92 116h168M92 116v128" />
          <path d="m118 216 62-70 62 70Z" />
          <circle cx="180" cy="146" r="5" fill="currentColor" />
        </g>
        <g className="geometry-piece geometry-piece-b" fill="none" stroke="currentColor">
          <path d="M852 112h226M1078 112v140" />
          <path d="m890 214 64-74 82 74" />
          <circle cx="954" cy="140" r="5" fill="currentColor" />
        </g>
        <g className="geometry-piece geometry-piece-c" fill="none" stroke="currentColor">
          <path d="M102 500h206M102 410v90" />
          <path d="M138 466h126M138 442h84" />
          <circle cx="264" cy="466" r="5" fill="currentColor" />
        </g>
        <g className="geometry-piece geometry-piece-d" fill="none" stroke="currentColor">
          <path d="M868 478h220M1088 376v102" />
          <path d="m906 440 54-46 82 46" />
          <circle cx="960" cy="394" r="5" fill="currentColor" />
        </g>

        <g className="geometry-guides" fill="none" stroke="currentColor">
          <path d="M180 146 650 332 954 140" />
          <path d="M264 466 650 332 960 394" />
          <circle cx="650" cy="332" r="4" fill="currentColor" />
        </g>
      </svg>

      <h2 id="differentiators-title" aria-label={headline} className="differentiators-motion-title relative z-[2] mt-6 max-w-[10ch] font-heading text-[clamp(3.35rem,5.5vw,6rem)] font-bold leading-[.91] tracking-[-0.07em]">
        <span aria-hidden>
          {headlineLines.map(({ text, steps, delay }) => (
            <span
              key={text}
              className="type-line-v3 block w-fit whitespace-nowrap"
              style={{ animationDelay: delay, animationTimingFunction: `steps(${steps}, end)` }}
            >
              {text}
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
}
