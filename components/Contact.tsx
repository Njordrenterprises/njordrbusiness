export default function Contact() {
  return (
    <section id="contact" class="container mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us</h2>
      <div class="max-w-2xl mx-auto">
        <form class="space-y-4">
          <div>
            <label for="name" class="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="email" class="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="message" class="block mb-2 font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
