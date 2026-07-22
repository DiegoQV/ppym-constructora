"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.classList.add("reveal-pending");

    let revealed = false;
    let checkFrame = 0;
    let prepareFrame = 0;
    let revealFrame = 0;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      observer?.disconnect();

      // Two frames guarantee that the hidden state is painted before its class
      // is removed. A single frame can be collapsed by Safari and Chromium on
      // short viewports when the element intersects during hydration.
      prepareFrame = window.requestAnimationFrame(() => {
        revealFrame = window.requestAnimationFrame(() => {
          element.classList.remove("reveal-pending");
        });
      });
    };
    const checkPosition = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > window.innerHeight * 0.04) reveal();
    };
    const scheduleCheck = () => {
      window.cancelAnimationFrame(checkFrame);
      checkFrame = window.requestAnimationFrame(checkPosition);
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
      },
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" },
    ) : null;

    observer?.observe(element);
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });
    scheduleCheck();
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(checkFrame);
      window.cancelAnimationFrame(prepareFrame);
      window.cancelAnimationFrame(revealFrame);
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      element.classList.remove("reveal-pending");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-[opacity,transform] duration-500 ease-out", className)}
    >
      {children}
    </div>
  );
}
