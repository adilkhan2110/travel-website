export default function FeaturedDestinations() {
  const destinations = [
    { name: "MIDDLE EAST", image: "/placeholder.svg?height=200&width=200" },
    { name: "EUROPE", image: "/placeholder.svg?height=200&width=200" },
    { name: "INDIA", image: "/placeholder.svg?height=200&width=200" },
    { name: "AFRICA", image: "/placeholder.svg?height=200&width=200" },
    { name: "ASIA", image: "/placeholder.svg?height=200&width=200" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Tours</h2>
          <p className="text-teal-600 font-semibold mb-4">Holiday Destinations</p>
          <h3 className="text-2xl font-bold text-gray-800">Where We Go?</h3>
        </div>

        <div className="flex justify-center items-center space-x-8">
          {destinations.map((destination, index) => (
            <div key={index} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{destination.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
