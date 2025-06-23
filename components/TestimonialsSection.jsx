export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Abhishek Jha",
      location: "Ranchi, Jharkhand",
      rating: 5,
      text: "I had a wonderful experience with Go Kite Tours Ranchi. The people are very well organized and I would recommend them for planning your next trip.",
      avatar: "/placeholder.svg?height=60&width=60",
      platform: "Google",
    },
    {
      name: "Ravi Kumar",
      location: "Delhi",
      rating: 5,
      text: "Excellent service and great holiday packages. The team was very helpful and made our trip memorable. Highly recommended!",
      avatar: "/placeholder.svg?height=60&width=60",
      platform: "Google",
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Amazing experience with Go Kite Tours. Professional service and excellent customer support throughout our journey.",
      avatar: "/placeholder.svg?height=60&width=60",
      platform: "Google",
    },
    {
      name: "Suresh Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Best travel agency I've worked with. They handled everything perfectly and our vacation was stress-free and enjoyable.",
      avatar: "/placeholder.svg?height=60&width=60",
      platform: "Google",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4">{testimonial.text}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{testimonial.platform}</span>
                <button className="bg-blue-600 text-white px-4 py-1 rounded text-xs">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
