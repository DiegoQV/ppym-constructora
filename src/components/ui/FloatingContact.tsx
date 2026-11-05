"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectAssistant } from "@/components/ui/ProjectAssistant";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export function FloatingContact() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = contactRef.current;
    if (!hero || !contact) return;

    const mobile = window.matchMedia("(max-width: 639px)");
    const updateDock = () => {
      const bounds = hero.getBoundingClientRect();
      contact.style.setProperty("--hero-bottom", `${bounds.bottom + window.scrollY}px`);
      contact.dataset.heroVisible = String(mobile.matches && bounds.bottom > 0 && bounds.top < window.innerHeight);
    };
    const resizeObserver = new ResizeObserver(updateDock);
    const intersectionObserver = new IntersectionObserver(updateDock);
    resizeObserver.observe(hero);
    intersectionObserver.observe(hero);
    mobile.addEventListener("change", updateDock);
    updateDock();
    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mobile.removeEventListener("change", updateDock);
    };
  }, []);

  return (
    <div ref={contactRef} className="floating-contact contents">
      <ProjectAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
      <WhatsAppFloat hidden={assistantOpen} />
    </div>
  );
}
