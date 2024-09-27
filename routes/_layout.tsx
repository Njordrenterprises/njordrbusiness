import { PageProps } from "$fresh/server.ts";
import { useEffect } from "preact/hooks";

export default function Layout({ Component }: PageProps) {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          let yOffset = -headerHeight - 200; // Default offset

          if (target.hash === '#about') {
            yOffset -= 100; // Additional 100px for About section
          }

          const y = element.getBoundingClientRect().top + globalThis.pageYOffset + yOffset;

          globalThis.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    document.querySelector('nav')?.addEventListener('click', handleNavClick);

    return () => {
      document.querySelector('nav')?.removeEventListener('click', handleNavClick);
    };
  }, []);

  return (
    <div class="flex flex-col min-h-screen">
      <header class="sticky top-0 bg-blue-600 text-white p-4 z-50">
        <div class="container mx-auto flex justify-between items-center">
          <a href="/" class="flex items-center">
            <img src="/njordr.webp" alt="Njordr Logo" class="h-10 w-auto mr-2" />
            <h1 class="text-2xl font-bold">Njordr Enterprises Inc.</h1>
          </a>
          <nav class="hidden md:flex space-x-4">
            <a href="/" class="hover:text-blue-200">Home</a>
            <a href="#gallery" class="hover:text-blue-200">Gallery</a>
            <a href="#services" class="hover:text-blue-200">Services</a>
            <a href="#about" class="hover:text-blue-200">About</a>
            <a href="#contact" class="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      <main class="flex-grow bg-gradient-to-b from-blue-100 via-white to-blue-100">
        <Component />
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; {currentYear} Made by Njordr</p>
      </footer>
    </div>
  );
}
