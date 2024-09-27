const services = [
  { name: "Soffit & Fascia", image: "images/soffit_fascia.webp" },
  { name: "Siding", image: "images/icyclimb.webp" },
  { name: "Board & Batten", image: "images/nicewinter.webp" },
  { name: "Trim & Posts", image: "images/posts.webp" },
  //   { name: "Roofing", image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800&h=600" },
  //   { name: "Eavestroughs", image: "https://images.unsplash.com/photo-1620387983671-ccbe5fc23a32?auto=format&fit=crop&q=80&w=800&h=600" },
];

export default function Services() {
  return (
    <section id="services" class="scroll-offset container mx-auto px-4 bg-opacity-80 bg-white">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Our Services</h2>
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.name} class="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
              <picture>
                <source srcSet={`${service.image} 800w, ${service.image.replace('.webp', '-400.webp')} 400w`} type="image/webp" />
                <img
                  src={service.image}
                  alt={service.name}
                  srcSet={`${service.image} 800w, ${service.image.replace('.webp', '-400.webp')} 400w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={800}
                  height={600}
                  class="w-full h-48 object-cover"
                  loading="lazy"
                />
              </picture>
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2 text-center">{service.name}</h3>
                {/* <p class="text-gray-600">Professional {service.name.toLowerCase()} services for your home.</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
