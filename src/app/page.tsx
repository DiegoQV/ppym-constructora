import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Differentiators } from "@/components/sections/Differentiators";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return <><Navbar /><main><Hero /><Credentials /><About /><Services /><Differentiators /><Process /><Projects /></main><WhatsAppFloat /></>;
}
