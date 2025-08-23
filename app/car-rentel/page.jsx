"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useCars from "../../store/useCars";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function VisaPage() {
  const { items, fetchItems, isFetchingItems } = useCars();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/cars/${id}`);
  };

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
          <Grid container spacing={4}>
  {isFetchingItems ? (
    <Typography>Loading cars...</Typography>
  ) : items && items.length > 0 ? (
    items.map((car) => (
      <Grid item xs={12} sm={6} md={4} key={car._id}>
        <Card className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition">
          {/* Car Image */}
          <CardMedia
            component="img"
            height="200"
            image={car.image || "/car-placeholder.jpg"}
            alt={car.name}
          />

          {/* Car Details */}
          <CardContent>
            <Typography variant="h6" className="font-bold mb-2">
              {car.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="mb-2"
            >
              {car.type} • {car.fuel_type}
            </Typography>

            <Typography variant="body2" className="mb-1">
              👥 {car.capacity?.adults} Adults | 🧳 {car.luggage_space}
            </Typography>
            <Typography variant="body2" className="mb-1">
              🚗 Driver: {car.capacity?.driver}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              className="font-semibold mt-2"
            >
              ₹{car.price_per_km} / KM
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  ) : (
    <Typography>No cars available</Typography>
  )}
</Grid>

        </div>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
