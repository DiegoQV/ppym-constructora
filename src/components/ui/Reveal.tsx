"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
export function Reveal({ children, className }: { children: ReactNode; className?: string }) { const reduceMotion = useReducedMotion(); return <motion.div className={cn(className)} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: "easeOut" }}>{children}</motion.div>; }
