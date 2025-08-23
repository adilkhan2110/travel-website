"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useCars from "../../store/useCars";

export default function VisaPage() {
  const { items, fetchItems } = useCars();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

  const router = useRouter();

  return (
    <main>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "transparent",
          background: "linear-gradient(to right, #2563eb, #9333ea, #ec4899)",
          py: { xs: 12, md: 16 },
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.2)",
          }}
        />
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Car Rental Services
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", mx: "auto", opacity: 0.8 }}
          >
            Choose from a wide range of vehicles at affordable prices. All cars
            come with professional drivers and full comfort.
          </Typography>
        </Container>
      </Box>

      {/* Cars List */}
      <Box sx={{ py: 10, bgcolor: "grey.50" }}>
        <Container>
          <Grid container spacing={4}>
            {items?.map((car) => (
              <Grid item key={car._id} xs={12} md={6} lg={4}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    boxShadow: 4,
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  {/* Car Image */}
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.image || "/car-placeholder.jpg"}
                    alt={car.name}
                    sx={{
                      transition: "transform 0.7s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />

                  {/* Car Details */}
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "grey.800",
                        transition: "color 0.3s",
                        "&:hover": { color: "success.main" },
                      }}
                      gutterBottom
                    >
                      {car.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {car.type} • {car.fuel_type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      👥 {car.capacity?.adults} Adults | 🧳 {car.luggage_space}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🚗 Driver: {car.capacity?.driver}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ color: "success.main", mt: 1 }}
                    >
                      ₹{car.price_per_km} / KM
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
