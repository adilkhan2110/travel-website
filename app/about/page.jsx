import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppWidget from "@/components/WhatsAppWidget"

export const metadata = {
  title: "About Us - Dream Voyager Tours",
  description:
    "Learn about Dream Voyager Tours, your trusted travel partner with years of experience in creating unforgettable journeys.",
}

export default function AboutPage() {
  return (
    <main>
     

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl opacity-90">Your Trusted Travel Partner</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Dream Voyager Tours was founded with a simple mission: to make extraordinary travel experiences
                accessible to everyone. With over a decade of experience in the travel industry, we have helped
                thousands of travelers discover the world's most beautiful destinations.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of travel experts is passionate about creating personalized itineraries that match your dreams
                and budget. From exotic beach destinations to cultural city tours, we handle every detail so you can
                focus on making memories.
              </p>
              <p className="text-gray-600">
                We believe that travel is not just about visiting places; it's about experiencing different cultures,
                meeting new people, and creating stories that last a lifetime.
              </p>
            </div>
            <div>
              <img src="/placeholder.svg?height=400&width=600" alt="Our team" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional travel experiences that exceed our clients' expectations while ensuring their
                safety, comfort, and satisfaction throughout their journey.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading travel company that connects people with the world's most incredible destinations
                through innovative and sustainable tourism practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  )
}
