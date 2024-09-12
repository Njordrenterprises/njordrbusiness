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
    <section id="services" class="container mx-auto px-4 bg-opacity-80 bg-white">
      <h2 class="text-3xl md:text-4xl font-bold text-center mr-8 ml-8mt-8 mb-8">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <div key={service.name} class="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
            <img src={service.image} alt={service.name} class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">{service.name}</h3>
              <p class="text-gray-600">Professional {service.name.toLowerCase()} services for your home.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
