import Hero from "../islands/Hero.tsx";
import Services from "./Services.tsx";
import About from "./About.tsx";


export default function LandingPage() {
  return (
    <div class="flex flex-col gap-16">
      <Hero />
      <Services />
      <About />
      
    </div>
  );
}
