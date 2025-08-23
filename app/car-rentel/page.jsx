"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useCars from "../../store/useCars";

export default function VisaPage() {
  const { items, fetchItems, isFetchingItems } = useCars();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const router = useRouter();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Car Rental Services
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg opacity-80">
                Choose from a wide range of vehicles at affordable prices. All
                cars come with professional drivers and full comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cars List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
              {items?.map((car) => (
                <div
                  key={car._id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Car Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image || "/car-placeholder.jpg"}
                      alt={car.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Car Details */}
                  <div className="p-8">
                    <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {car.type} • {car.fuel_type}
                    </p>
                    <p className="text-gray-600 mb-1">
                      👥 {car.capacity?.adults} Adults | 🧳 {car.luggage_space}
                    </p>
                    <p className="text-gray-600 mb-1">
                      🚗 Driver: {car.capacity?.driver}
                    </p>
                    <p className="text-emerald-600 font-bold mt-3">
                      ₹{car.price_per_km} / KM
                    </p>

                 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
