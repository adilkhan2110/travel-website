"use client"
import { useEffect, useState } from "react"
import useBannerStore from "@/store/useBannerStore"

export default function HeroSection() {
  const { items, fetchItems, isFetchingItems } = useBannerStore()
  const [currentSlide, setCurrentSlide] = useState(0)

  // fetch banners on mount
  useEffect(() => {
    fetchItems(0, 10, true) // 👈 all banners
  }, [fetchItems])

  // auto-slide
  useEffect(() => {
    if (items.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % items.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)

  if (isFetchingItems) {
    return (
      <section className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading banners...
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="h-screen flex items-center justify-center bg-gray-900 text-white">
        No banners available
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {items.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                <p className="text-xl md:text-3xl text-white mb-10 opacity-90 font-light">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1">
                    {slide.cta1 || "Learn More"}
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-full transition-all duration-300 backdrop-blur-sm">
                    {slide.cta2 || "Book Now"}
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
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
      >
        →
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {items.map((_, index) => (
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
