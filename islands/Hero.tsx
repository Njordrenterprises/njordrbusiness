import { useEffect, useState } from "preact/hooks";

export default function Hero() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header');
    const quoteButton = document.getElementById('quote-button');

    if (!header || !quoteButton) return;

    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const heroHeight = globalThis.innerHeight * 0.5; // Assuming hero height is 50vh

      if (scrollPosition > heroHeight - header.offsetHeight) {
        setIsSticky(true);
        quoteButton.style.position = 'fixed';
        quoteButton.style.top = `${header.offsetHeight}px`;
        quoteButton.style.left = '50%';
        quoteButton.style.transform = 'translateX(-50%) scale(0.8)';
        quoteButton.style.zIndex = '60';
      } else {
        setIsSticky(false);
        quoteButton.style.position = 'static';
        quoteButton.style.transform = 'none';
      }
    };

    globalThis.addEventListener('scroll', handleScroll);

    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div class="relative flex items-center justify-center h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
      <img
        src="images/fancywood.webp"
        alt="Exterior renovation"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 font-norse">Njördr Exteriors</h1>
        <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10">Transform Your Home's Exterior in Winnipeg</p>
        <a
          id="quote-button"
          href="#contact"
          class={`inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 text-2xl rounded-full transition duration-300 animate-pulse-glow quote-button ${isSticky ? 'quote-button-sticky' : ''}`}
        >
          <span class="relative z-10">Get a Free Quote</span>
        </a>
      </div>
    </div>
  );
}
