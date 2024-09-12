import Hero from "./Hero.tsx";
import Services from "./Services.tsx";
import About from "./About.tsx";
import Contact from "./Contact.tsx";

export default function LandingPage() {
  return (
    <div class="flex flex-col gap-16">
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
}
