import Link from "next/link"

export default function FeaturedTours() {
  const tours = [
    {
      id: 1,
      title: "Tropical Paradise",
      location: "Maldives",
      price: "$2,499",
      duration: "7 Days",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Cultural Journey",
      location: "Japan",
      price: "$3,299",
      duration: "10 Days",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Mountain Adventure",
      location: "Nepal",
      price: "$1,899",
      duration: "14 Days",
      image: "/placeholder.svg?height=300&width=400",
      rating: 4.7,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular destinations and create memories that will last a lifetime
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  {tour.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{tour.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {tour.location} • {tour.duration}
                </p>

                <Link
                  href="/tours"
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors"
          >
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  )
}
