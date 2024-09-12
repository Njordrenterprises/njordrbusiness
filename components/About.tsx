export default function About() {
  return (
    <section id="about" class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Njordr Exterior Renovations</h2>
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <img
              src="images/sidingreno.webp"
              alt="Our team"
              class="rounded-lg shadow-md"
            />
          </div>
          <div class="md:w-1/2">
            <p class="text-lg mb-4">
              Njordr Exterior Renovations is Winnipeg's premier choice for all your exterior renovation needs. With years of experience and a commitment to quality, we transform homes across Manitoba.
            </p>
            <p class="text-lg mb-4">
              Our team of skilled professionals specializes in soffit and fascia, siding, board and batten, trim work, roofing, and eavestrough installation. We pride ourselves on using the highest quality materials and innovative techniques to ensure your home looks beautiful and stays protected for years to come.
            </p>
            <p class="text-lg">
              Choose Njordr for your next exterior renovation project and experience the difference that true craftsmanship makes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
