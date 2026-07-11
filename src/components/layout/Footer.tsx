import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
export function Footer() { return <footer className="border-t border-light-gray py-6"><Container><p className="text-sm text-text-gray">{company.legalName}</p></Container></footer>; }
