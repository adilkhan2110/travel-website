export default function InternationalTours() {
  const tours = [
    {
      id: 1,
      title: "DUBAI TOUR PACKAGES",
      subtitle: "Starting from",
      price: "INR 25,000",
      duration: "5 Nights & 6 Days",
      image: "/images/dubai.jpg",
    },
    {
      id: 2,
      title: "MALAYSIA TOUR PACKAGE",
      subtitle: "Starting from",
      price: "INR 30,000",
      duration: "6 Nights & 7 Days",
      image: "/images/malaysia.jpg",
    },
    {
      id: 3,
      title: "SINGAPORE TOUR PACKAGE",
      subtitle: "Starting from",
      price: "INR 35,000",
      duration: "4 Nights & 5 Days",
      image: "/images/singapore.jpg",
    },
    {
      id: 4,
      title: "THAILAND TOUR PACKAGE",
      subtitle: "Starting from",
      price: "INR 28,000",
      duration: "5 Nights & 6 Days",
      image: "/images/thailand.jpg",
    },
    {
      id: 5,
      title: "BALI TOUR PACKAGE",
      subtitle: "Starting from",
      price: "INR 32,000",
      duration: "6 Nights & 7 Days",
      image: "/images/bali.jpg",
    },
    {
      id: 6,
      title: "AUSTRALIA TOUR PACKAGE",
      subtitle: "Starting from",
      price: "INR 85,000",
      duration: "8 Nights & 9 Days",
      image: "/images/australia.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            International Tour Packages
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            Explore the world's best attractions with our highly rated International Tour Packages designed for
            everyone. Join us at Arisha Tours and Travels the best travel agency to discover and experience the most
            exciting adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {tour.price}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{tour.subtitle}</p>
                <p className="text-sm text-gray-600 mb-6">{tour.duration}</p>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
            VIEW MORE →
          </button>
        </div>
      </div>
    </section>
  )
}
