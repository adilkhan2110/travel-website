"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ImagePopup from "@/components/ImagePopup";
import useGalleryStore from "../../store/useGalleryStore ";

export default function GalleryPage() {
  const { items, fetchItems, isFetchingItems } = useGalleryStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  // Normalize and map backend data
  const images = items.map((item) => ({
    id: item._id,
    src: item.image,
    title: item.title,
    category: item.category?.toLowerCase(),
  }));

  // Generate dynamic categories from backend data
  const categories = [
    { id: "all", name: "All" },
    ...Array.from(new Set(images.map((img) => img.category))).map((cat) => ({
      id: cat,
      name: cat?.charAt(0).toUpperCase() + cat?.slice(1),
    })),
  ];

  // Filter based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openPopup = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center py-24">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/70 via-teal-600/70 to-cyan-600/70"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Gallery</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Explore Our Travel Destinations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {isFetchingItems ? (
            <div className="text-center text-xl py-20 text-gray-500">
              Loading gallery...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => openPopup(image)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm capitalize">
                        {image.category}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
      <ImagePopup
        image={selectedImage}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </main>
  );
}
