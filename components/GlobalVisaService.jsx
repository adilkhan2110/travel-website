"use client"
import { useState } from "react"

export default function GlobalVisaService() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visaServices = [
    { country: "CHINA VISA", image: "/images/dubai.jpg" },
    { country: "DUBAI VISA", image: "/images/dubai.jpg" },
    { country: "SCHENGEN VISA", image: "/images/dubai.jpg" },
    { country: "UK VISA", image: "/images/dubai.jpg" },
    { country: "US VISA", image: "/images/dubai.jpg" },
    { country: "TURKEY VISA", image: "/images/dubai.jpg" },
    { country: "SINGAPORE VISA", image: "/images/dubai.jpg" },
    { country: "CHINA VISA", image: "/images/dubai.jpg" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (visaServices.length - 6))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (visaServices.length - 6)) % (visaServices.length - 6))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Global Visa Service</h2>
        </div>

        <div className="relative">
          <div className="flex items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="overflow-hidden mx-12">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * (100 / 7)}%)` }}
              >
                {visaServices.map((visa, index) => (
                  <div key={index} className="flex-shrink-0 w-1/7 px-2">
                    <div className="text-center">
                      <img
                        src={visa.image || "/placeholder.svg"}
                        alt={visa.country}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-sm text-gray-800">{visa.country}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
