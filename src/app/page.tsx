import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Credentials } from "@/components/sections/Credentials";
import { Differentiators } from "@/components/sections/Differentiators";
import { Equipment } from "@/components/sections/Equipment";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export default function Home() {
  return <><LocalBusinessJsonLd /><Navbar /><main><Hero /><Credentials /><About /><Services /><Differentiators /><Process /><Projects /><Equipment /><Contact /></main><Footer /><FloatingContact /></>;
}
