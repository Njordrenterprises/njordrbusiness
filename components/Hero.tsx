export default function Hero() {
  return (
    <div class="relative h-screen flex items-center justify-center">
      <img
        src="images/fancywood.webp"
        alt="Exterior renovation"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative z-10 text-center text-white">
        <h1 class="text-8xl md:text-8xl font-bold mb-4 font-norse">Njördr Exteriors</h1>
        <p class="text-xl md:text-4xl mb-8">Transform Your Home's Exterior in Winnipeg</p>
        <a
          href="#contact"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg transition duration-300"
        >
          Get a Free Quote
        </a>
      </div>
    </div>
  );
}
