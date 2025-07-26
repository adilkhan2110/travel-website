"use client";
import useVisaDetail from "@/store/useVisaDetail";
import { useEffect, useState } from "react";

export default function GlobalVisaService() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const { items, fetchItems, isFetchingItems } = useVisaDetail();

  // useEffect to fetch data
  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  // Responsive itemsPerPage
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 2 : 7);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = items.length - itemsPerPage;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Global Visa Service
          </h2>
        </div>

        <div className="relative">
          <div className="flex items-center">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slider */}
            <div className="overflow-hidden mx-12 w-full">
              <div
                className="flex transition-transform duration-300"
                style={{
                  width: `${(items.length / itemsPerPage) * 100}%`,
                  transform: `translateX(-${(100 / items.length) * currentIndex}%)`,
                }}
              >
                {items.map((visa, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / items.length}%` }}
                  >
                    <div className="text-center">
                      <img
                        src={visa.image || "/placeholder.svg"}
                        alt={visa.country || visa.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-sm text-gray-800">
                        {visa.country || visa.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Button */}
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
  );
}
