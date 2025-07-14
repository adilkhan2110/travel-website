"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TourCard from "@/components/TourCard";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import useHolidayPackages from "../../store/useHolidayPackages";
import FromPage from "@/components/form/form";

export default function ToursPage() {
  const { items, fetchItems, isFetchingItems } = useHolidayPackages();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main>
    

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Tours & Holidays
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover Amazing Destinations
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Popular Tour Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of tour packages
              designed to give you the best travel experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items?.map((tour) => (
              <TourCard key={tour.id} tour={tour} handleOpen={handleOpen} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Let us create a custom tour package just for you. Our travel experts
            will work with you to design the perfect itinerary.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors">
            Request Custom Tour
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
          className="modal-box"
        >
          <FromPage handleClose={handleClose} />
        </div>
      </Modal>
    </main>
  );
}
