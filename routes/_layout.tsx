import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div class="flex flex-col min-h-screen">
      <header class="sticky top-0 bg-blue-600 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <img src="/njordr.webp" alt="Njordr Logo" class="h-10 w-auto mr-2" />
            <h1 class="text-2xl font-bold">Njordr Enterprises Inc.</h1>
          </div>
          <nav class="hidden md:flex space-x-4">
            <a href="#" class="hover:text-blue-200">Home</a>
            <a href="#services" class="hover:text-blue-200">Services</a>
            <a href="#about" class="hover:text-blue-200">About</a>
            <a href="#contact" class="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      <main class="flex-grow">
        <Component />
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; {currentYear} Made by Njordr</p>
      </footer>
    </div>
  );
}
