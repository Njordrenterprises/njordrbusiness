export default function Hero() {
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
        <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 lg:mb-8">Transform Your Home's Exterior in Winnipeg</p>
        <a
          href="#contact"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg transition duration-300"
        >
          Get a Free Quote
        </a>
      </div>
    </div>
  );
}
