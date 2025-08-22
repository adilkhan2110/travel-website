"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import useJaipurSightseeing from "@/store/useJaipurSightseeing";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function VisaPage() {
  const [showAll, setShowAll] = useState(false);
  const { items, fetchItems } = useJaipurSightseeing();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const displayedTours = showAll ? items : items?.slice(0, 6);

  const visaTypes = [
    {
      title: "Tourist Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      description: "For leisure and sightseeing purposes",
    },
    {
      title: "Business Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
      description: "For business meetings and conferences",
    },
    {
      title: "Transit Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      description: "For connecting flights and short layovers",
    },
    {
      title: "Medical Visa",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      description: "For medical treatment and healthcare",
    },
  ];

  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/visa/${id}`);
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
            {/* <p className="text-xl md:text-2xl opacity-90 mb-8">
              Your Gateway to Global Travel
            </p> */}
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
                  onClick={handleOpen}
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
