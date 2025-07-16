"use client"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "DREAM DESTINATIONS",
      subtitle: "Grab! The best deal for your trip",
      image: "/images/hero-1.jpg",
      cta1: "Find Your Holidays",
      cta2: "Global Visa Services",
    },
    {
      id: 2,
      title: "ADVENTURE AWAITS",
      subtitle: "Discover the world's hidden gems",
      image: "/images/hero-2.jpg",
      cta1: "Explore Tours",
      cta2: "Book Now",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="text-white mb-6">
                  <div className="text-7xl font-bold opacity-20">01</div>
                  <div className="w-px h-20 bg-gradient-to-b from-emerald-400 to-teal-400 ml-8"></div>
                  <div className="text-sm opacity-60 ml-8 mt-2">02</div>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                <p className="text-xl md:text-3xl text-white mb-10 opacity-90 font-light">{slide.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1">
                    {slide.cta1}
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-full transition-all duration-300 backdrop-blur-sm">
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
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gradient-to-r from-orange-500 to-pink-500 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
