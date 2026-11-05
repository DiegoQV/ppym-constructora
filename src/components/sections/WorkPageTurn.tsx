"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Point = [number, number];

// Clip a sheet by a diagonal. Coordinates are percentages so the fold scales
// with its frame without measuring layout during the animation.
function sheetPolygon(cut: number): Point[] {
  const edge = Math.max(0, Math.min(100, cut));
  const farEdge = Math.max(0, Math.min(100, cut - 100));
  const points: Point[] = [[0, 0], [edge, 0], [100, farEdge], [farEdge, 100], [0, edge]];
  return points.filter(([x, y]) => x + y <= cut + 0.001);
}

export function WorkPageTurn({ children, direction, onComplete }: {
  children: ReactNode;
  direction: number;
  onComplete: () => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const foldRef = useRef<SVGPolygonElement>(null);
  const shadowRef = useRef<SVGPolygonElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const doneRef = useRef(onComplete);

  useEffect(() => { doneRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const duration = reduced.matches ? 0 : mobile.matches ? 320 : 1050;
    let frame = 0;
    let start: number | null = null;
    const mirror = ([x, y]: Point): Point => [direction < 0 ? 100 - x : x, y];
    const svgPoints = (points: Point[]) => points.map(mirror).map((point) => point.join(",")).join(" ");
    const tick = (time: number) => {
      start ??= time;
      const progress = duration ? Math.min((time - start) / duration, 1) : 1;
      // A smooth start and finish, with a continuous diagonal fold in between.
      const eased = progress * progress * (3 - 2 * progress);
      if (mobile.matches || reduced.matches) {
        if (sheetRef.current) sheetRef.current.style.opacity = String(1 - eased);
      } else {
        const cut = 200 * (1 - eased);
        const width = 15 * Math.sin(Math.PI * progress);
        const front = sheetPolygon(cut);
        const inner = sheetPolygon(Math.max(0, cut - width));
        const outer = sheetPolygon(Math.min(200, cut + width * 0.45));
        // Only the diagonal endpoints are needed to form the reverse of the sheet.
        const diagonal = (points: Point[], line: number) => points.filter(([x, y]) => Math.abs(x + y - line) < 0.01);
        const fold = [...front.filter(([x, y]) => x + y >= cut - width), ...diagonal(inner, Math.max(0, cut - width)).reverse()];
        const shadow = [...outer.filter(([x, y]) => x + y >= cut), ...diagonal(front, cut).reverse()];
        if (sheetRef.current) sheetRef.current.style.clipPath = `polygon(${front.map(mirror).map(([x, y]) => `${x}% ${y}%`).join(",")})`;
        foldRef.current?.setAttribute("points", svgPoints(fold));
        shadowRef.current?.setAttribute("points", svgPoints(shadow));
        const [x1, y1] = mirror([(cut - width) / 2, (cut - width) / 2]);
        const [x2, y2] = mirror([cut / 2, cut / 2]);
        gradientRef.current?.setAttribute("x1", String(x1));
        gradientRef.current?.setAttribute("y1", String(y1));
        gradientRef.current?.setAttribute("x2", String(x2));
        gradientRef.current?.setAttribute("y2", String(y2));
      }
      if (progress < 1) frame = window.requestAnimationFrame(tick);
      else doneRef.current();
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [direction]);

  return (
    <div className="work-page-turn" aria-hidden="true">
      <div ref={sheetRef} className="work-page-sheet">{children}</div>
      <svg className="work-page-fold" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient ref={gradientRef} id="work-paper-back" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7f817e" />
            <stop offset=".15" stopColor="#d6d7d0" />
            <stop offset=".58" stopColor="#faf9f2" />
            <stop offset=".9" stopColor="#e8e8df" />
            <stop offset="1" stopColor="#a3a59f" />
          </linearGradient>
        </defs>
        <polygon ref={shadowRef} fill="#050908" opacity=".24" />
        <polygon ref={foldRef} fill="url(#work-paper-back)" />
      </svg>
    </div>
  );
}
