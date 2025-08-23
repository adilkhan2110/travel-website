"use client";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useVisaDetail from "../../store/useVisaDetail";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { CheckIcon, ShieldCloseIcon } from "lucide-react";
export default function VisaPage() {
  const { items, fetchItems, isFetchingItems } = useVisaDetail();

  useEffect(() => {
    fetchItems("", "", true);
  }, [fetchItems]);

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
              Car Rental Services
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

        <Box
          className="visa-page"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
        >
          {/* Left side */}
          <Box flex={2}>
            {/* Image */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
              alt="Tourist Visa - Thailand"
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            {/* Description */}
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography>
              This visa allows you to explore Thailand for up to 30 days for
              tourism purposes.
            </Typography>

            {/* Requirements */}
            <Typography variant="h6" mt={4}>
              Requirements
            </Typography>
            <List>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Valid Passport with
                at least 6 months validity
              </ListItem>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Completed Visa
                Application Form
              </ListItem>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Passport-size
                photographs
              </ListItem>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Proof of
                accommodation and return ticket
              </ListItem>
            </List>

            {/* Highlights */}
            <Typography variant="h6" mt={4}>
              Highlights
            </Typography>
            <List>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Quick processing
                within 5-7 working days
              </ListItem>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Multiple entry
                options available
              </ListItem>
              <ListItem>
                <CheckIcon color="success" sx={{ mr: 1 }} /> Support available
                throughout the process
              </ListItem>
            </List>

            {/* Detailed Overview */}
            <Typography variant="h6" mt={4}>
              Detailed Overview
            </Typography>
            <Typography>
              Thailand is known for its stunning beaches, rich culture, and
              vibrant nightlife. This tourist visa is perfect for travelers who
              want to explore the country hassle-free.
            </Typography>

            {/* Itinerary */}
            <Typography variant="h6" mt={4}>
              Suggested Itinerary
            </Typography>
            <List>
              <ListItem>• Day 1: Arrival in Bangkok</ListItem>
              <ListItem>• Day 2: City Tour & Temples Visit</ListItem>
              <ListItem>• Day 3: Pattaya Beach Trip</ListItem>
              <ListItem>• Day 4: Shopping & Night Market</ListItem>
              <ListItem>• Day 5: Departure</ListItem>
            </List>

            {/* Includes / Excludes */}
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Includes</Typography>
                <List>
                  <ListItem>
                    <CheckIcon color="primary" sx={{ mr: 1 }} /> Visa processing
                    assistance
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="primary" sx={{ mr: 1 }} /> Document
                    verification
                  </ListItem>
                  <ListItem>
                    <CheckIcon color="primary" sx={{ mr: 1 }} /> Guidance from
                    start to finish
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Doesn't Include</Typography>
                <List>
                  <ListItem>
                    <ShieldCloseIcon color="error" sx={{ mr: 1 }} /> Visa application
                    fees
                  </ListItem>
                  <ListItem>
                    <ShieldCloseIcon color="error" sx={{ mr: 1 }} /> Flight tickets
                  </ListItem>
                  <ListItem>
                    <ShieldCloseIcon color="error" sx={{ mr: 1 }} /> Travel insurance
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
