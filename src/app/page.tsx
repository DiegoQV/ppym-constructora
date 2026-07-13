import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return <><Navbar /><main><Hero /><Credentials /><Services /><About /></main><WhatsAppFloat /></>;
}
