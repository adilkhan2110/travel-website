"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import useJaipurSightseeing from "@/store/useJaipurSightseeing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function VisaPage() {
  const [showAll, setShowAll] = useState(false);
  const { items, fetchItems } = useJaipurSightseeing();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const displayedTours = showAll ? items : items?.slice(0, 6);

  const router = useRouter();

  const handleOpen = (id) => {
    router.push(`/jaipur-sightseeing/${id}`);
  };

  return (
    <main>
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Jaipur Sightseeing
            </h1>

            <div className="max-w-2xl mx-auto">
              <p className="text-lg opacity-80">
                Get your visa processed quickly and hassle-free with Arisha
                Tours and Travels. We provide comprehensive visa services for
                all major destinations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {displayedTours?.map((tour) => (
            <div
              key={tour._id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${tour.image || "/placeholder.svg"}`}
                  alt={tour.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {tour.title}
                </h3>

                <button
                  onClick={handleOpen(tour._id)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Only show if more than 6 tours */}
        {items?.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              VIEW MORE →
            </button>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
