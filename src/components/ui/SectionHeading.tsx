import { cn } from "@/lib/utils";
interface Props { eyebrow?: string; title: string; description?: string; className?: string }
export function SectionHeading({ eyebrow, title, description, className }: Props) { return <header className={cn("max-w-3xl", className)}>{eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-text-gray">{eyebrow}</p>}<h2 className="font-heading text-3xl font-semibold tracking-tight text-charcoal">{title}</h2>{description && <p className="mt-4 text-base leading-7 text-text-gray">{description}</p>}</header>; }
