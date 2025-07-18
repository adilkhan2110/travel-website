export default function TourCard({ tour, handleOpen }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={
            `${tour.image}` ||
            "/placeholder.svg"
          }
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
          ₹ {tour.price}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
        <p className="text-gray-600 mb-4">
          {tour.country} • {tour.duration}
        </p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {tour.includes.map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleOpen}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
