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

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || !("IntersectionObserver" in window)) return;

    const rect = element.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyVisible) return;

    element.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
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
