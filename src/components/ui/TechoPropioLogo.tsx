import Image from "next/image";
import { cn } from "@/lib/utils";

export function TechoPropioLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/techo-propio.png"
      alt="Techo Propio"
      width={600}
      height={600}
      sizes="80px"
      className={cn("size-16 shrink-0 bg-white object-contain sm:size-20", className)}
    />
  );
}
