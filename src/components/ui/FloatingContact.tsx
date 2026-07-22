"use client";

import { useState } from "react";
import { ProjectAssistant } from "@/components/ui/ProjectAssistant";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export function FloatingContact() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <ProjectAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />
      <WhatsAppFloat hidden={assistantOpen} />
    </>
  );
}
