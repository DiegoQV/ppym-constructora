import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Differentiators } from "@/components/sections/Differentiators";
import { Equipment } from "@/components/sections/Equipment";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export default function Home() {
  return <><LocalBusinessJsonLd /><Navbar /><main><Hero /><About /><Services /><Projects /><Differentiators /><Process /><Equipment /><Contact /></main><Footer /></>;
}
