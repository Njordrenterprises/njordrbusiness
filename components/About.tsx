export default function About() {
  return (
    <section id="about" class="scroll-offset scroll-offset-extra py-16 bg-white bg-opacity-80">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">About Njörðr Exteriors</h2>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="md:w-1/2">
            <picture>
              <source srcSet="images/funsun.webp" type="image/webp" />
              <img
                src="images/funsun.jpg"
                alt="Exterior renovation project"
                srcSet="images/funsun.webp 800w, images/funsun-400.webp 400w"
                sizes="(max-width: 768px) 100vw, 50vw"
                width={800}
                height={600}
                class="rounded-lg shadow-lg w-full h-auto object-cover"
                loading="lazy"
              />
            </picture>
          </div>
          <div class="md:w-1/2 space-y-6 bg-white bg-opacity-90 p-6 rounded-lg">
            <p class="text-lg leading-relaxed">
              Welcome to Njörðr Exteriors, Winnipeg's premier choice for exterior renovations. We're not just contractors; we're your neighbors, committed to transforming homes across Manitoba with a personal touch and unparalleled craftsmanship.
            </p>
            <p class="text-lg leading-relaxed">
              At Njörðr, we believe in quality over quantity. Our approach is simple: we treat every home as if it were our own, ensuring that each project receives the attention to detail it deserves. Our team of skilled professionals brings years of experience and a passion for excellence to every job, big or small.
            </p>
            <p class="text-lg leading-relaxed">
              We specialize in:
            </p>
            <ul class="list-disc list-inside space-y-2 text-lg">
              <li>Soffit and fascia installation</li>
              <li>Siding replacement and repair</li>
              <li>Board and batten installation</li>
              <li>Trim work and detailing</li>
              <li>Roof repair</li>
            </ul>
            <p class="text-lg leading-relaxed">
              What sets us apart is our unwavering commitment to customer satisfaction. We understand that renovating your home can be a significant decision, which is why we prioritize clear communication, transparency, and respect for your property throughout the entire process.
            </p>
            <p class="text-lg leading-relaxed">
              We take pride in using only the highest quality materials, sourced from reputable suppliers. This commitment to quality, combined with our expert installation techniques, allows us to offer a 5-year installation warranty on all our work. It's our way of saying we stand behind every project we complete, from siding installations to roof repairs.
            </p>
            <p class="text-lg font-semibold mt-6">
              Choose Njörðr Exteriors for your next renovation project and experience the perfect blend of traditional craftsmanship and modern expertise.
            </p>
            <p class="text-lg font-semibold">
              Let's work together to create an exterior that not only protects your home but also reflects your unique style and enhances your property's value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
