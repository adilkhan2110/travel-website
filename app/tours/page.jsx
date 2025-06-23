import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppWidget from "@/components/WhatsAppWidget"
import TourCard from "@/components/TourCard"

export const metadata = {
  title: "Tours & Holidays - Dream Voyager Tours",
  description:
    "Explore our amazing tour packages and holiday destinations. From tropical beaches to cultural cities, find your perfect getaway.",
}

const tours = [
  {
    id: 1,
    title: "Tropical Paradise Getaway",
    location: "Maldives",
    duration: "7 Days / 6 Nights",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    features: ["All Inclusive", "Water Villa", "Spa Treatments", "Water Sports"],
  },
  {
    id: 2,
    title: "Cultural Heritage Tour",
    location: "Japan",
    duration: "10 Days / 9 Nights",
    price: "$3,299",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
    features: ["Traditional Hotels", "Cultural Sites", "Local Cuisine", "Guided Tours"],
  },
  {
    id: 3,
    title: "Adventure Mountain Trek",
    location: "Nepal",
    duration: "14 Days / 13 Nights",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    features: ["Trekking Guide", "Mountain Views", "Local Villages", "Adventure Sports"],
  },
  {
    id: 4,
    title: "European City Break",
    location: "Paris & Rome",
    duration: "8 Days / 7 Nights",
    price: "$2,799",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    features: ["City Tours", "Museums", "Fine Dining", "Shopping"],
  },
  {
    id: 5,
    title: "Safari Adventure",
    location: "Kenya",
    duration: "6 Days / 5 Nights",
    price: "$2,199",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    features: ["Game Drives", "Wildlife Viewing", "Lodge Stay", "Photography"],
  },
  {
    id: 6,
    title: "Beach & Island Hopping",
    location: "Thailand",
    duration: "9 Days / 8 Nights",
    price: "$1,699",
     image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80",
    features: ["Island Tours", "Beach Resorts", "Snorkeling", "Local Markets"],
  },
];


export default function ToursPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Tours & Holidays</h1>
            <p className="text-xl md:text-2xl opacity-90">Discover Amazing Destinations</p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Tour Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of tour packages designed to give you the best travel
              experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Let us create a custom tour package just for you. Our travel experts will work with you to design the
            perfect itinerary.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors">
            Request Custom Tour
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  )
}
