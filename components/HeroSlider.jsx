"use client"
import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    title: "DREAM DESTINATIONS",
    subtitle: "Grab! The best deal for your trip",
    image: "/placeholder.svg?height=800&width=1200",
    cta1: "Find Your Holidays",
    cta2: "Global Visa Services",
  },
  {
    id: 2,
    title: "ADVENTURE AWAITS",
    subtitle: "Discover the world's hidden gems",
    image: "/placeholder.svg?height=800&width=1200",
    cta1: "Explore Tours",
    cta2: "Book Now",
  },
  {
    id: 3,
    title: "LUXURY ESCAPES",
    subtitle: "Experience premium travel like never before",
    image: "/placeholder.svg?height=800&width=1200",
    cta1: "Luxury Packages",
    cta2: "Contact Us",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl text-white mb-8 opacity-90">{slide.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors">
                    {slide.cta1}
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full transition-colors">
                    {slide.cta2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-yellow-500" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Slide Numbers */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 text-white">
        <div className="text-4xl font-bold opacity-50">{String(currentSlide + 1).padStart(2, "0")}</div>
        <div className="w-px h-16 bg-white opacity-30 mx-auto my-2"></div>
        <div className="text-sm opacity-50">{String(slides.length).padStart(2, "0")}</div>
      </div>
    </section>
  )
}
