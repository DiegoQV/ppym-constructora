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
    let revealFrame = 0;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      element.getBoundingClientRect();
      revealFrame = window.requestAnimationFrame(() => element.classList.remove("reveal-pending"));
    };
    const checkPosition = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.08) reveal();
    };
    const scheduleCheck = () => {
      window.cancelAnimationFrame(checkFrame);
      checkFrame = window.requestAnimationFrame(checkPosition);
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer?.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    ) : null;

    observer?.observe(element);
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });
    scheduleCheck();
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(checkFrame);
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
