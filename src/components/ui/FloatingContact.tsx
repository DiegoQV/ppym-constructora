"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ProjectAssistant } from "@/components/ui/ProjectAssistant";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export function FloatingContact({ assistantOpen, onOpenChange, headerLauncher }: {
  assistantOpen: boolean;
  onOpenChange: (open: boolean) => void;
  headerLauncher: RefObject<HTMLButtonElement | null>;
}) {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = contactRef.current;
    if (!hero || !contact) return;

    const observer = new IntersectionObserver(([entry]) => {
      contact.dataset.heroVisible = String(entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={contactRef} data-hero-visible="true" className="floating-contact contents">
      <ProjectAssistant open={assistantOpen} onOpenChange={onOpenChange} headerLauncher={headerLauncher} />
      <WhatsAppFloat hidden={assistantOpen} />
    </div>
  );
}
