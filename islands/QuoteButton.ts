import { useEffect } from "preact/hooks";

export default function QuoteButton() {
  useEffect(() => {
    const header = document.querySelector('header');
    const quoteButton = document.getElementById('quote-button');
    const quoteButtonWrapper = document.getElementById('quote-button-wrapper');

    if (!header || !quoteButton || !quoteButtonWrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          quoteButton.classList.add('fixed', 'top-4', 'right-4', 'z-[60]', 'quote-button-sticky');
          quoteButton.classList.remove('inline-block');
        } else {
          quoteButton.classList.remove('fixed', 'top-4', 'right-4', 'z-[60]', 'quote-button-sticky');
          quoteButton.classList.add('inline-block');
        }
      },
      { threshold: 0, rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }
    );

    observer.observe(quoteButtonWrapper);

    return () => observer.disconnect();
  }, []);

  return null;
}
