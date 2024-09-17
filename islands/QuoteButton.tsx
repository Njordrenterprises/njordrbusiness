import { useEffect, useState } from "preact/hooks";

export default function QuoteButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const header = document.querySelector('header');
    const quoteButton = document.getElementById('quote-button');

    if (!header || !quoteButton) return;

    const handleScroll = () => {
      const scrollPosition = globalThis.scrollY;
      const windowHeight = globalThis.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const heroHeight = windowHeight * 0.5;
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      if (scrollPosition > heroHeight - header.offsetHeight) {
        quoteButton.classList.add('quote-button-sticky');
        quoteButton.classList.remove('quote-button-hero');
      } else {
        quoteButton.classList.remove('quote-button-sticky');
        quoteButton.classList.add('quote-button-hero');
      }

      setIsVisible(scrollPercentage <= 99);
    };

    globalThis.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="/estimate"
      id="quote-button"
      class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 text-2xl rounded-full transition duration-300 animate-pulse-glow quote-button quote-button-hero"
    >
      Get a Free Quote
    </a>
  );
}
