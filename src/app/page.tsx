import { Navbar } from "@/components/layout/Navbar";
import { Credentials } from "@/components/sections/Credentials";
import { Hero } from "@/components/sections/Hero";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return <><Navbar /><main><Hero /><Credentials /></main><WhatsAppFloat /></>;
}
