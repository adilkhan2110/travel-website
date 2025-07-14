"use client";
import Footer from "@/components/Footer";
import FromPage from "@/components/form/form";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useVisaDetail from "../../../store/useVisaDetail";

export default function VisaPage() {
  const { id } = useParams();
  const { selectedItem, isFetchingItemById, getItemById } = useVisaDetail();

  useEffect(() => {
    if (id) {
      getItemById(id);
    }
  }, [id]);

  if (isFetchingItemById) return <p>Loading visa details...</p>;
  if (!selectedItem) return <p>No visa data found.</p>;

  return (
    <main className="view-detail">
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedItem.title}
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src={selectedItem.image}
              alt={selectedItem.title}
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: selectedItem.description }}
            />

            <Typography sx={{ mt: 2 }}>
              <strong>Duration:</strong> {selectedItem.days} Days
            </Typography>

            <Typography sx={{ mt: 2 }}>
              <strong>Validity:</strong> {selectedItem.validity} Months
            </Typography>

            {/* Requirements */}
            {selectedItem.requirements?.length > 0 && (
              <>
                <Typography variant="h6" mt={4}>
                  Requirements
                </Typography>
                <List>
                  {selectedItem.requirements.map((item, idx) => (
                    <ListItem key={idx}>
                      <CheckIcon color="success" sx={{ mr: 1 }} /> {item}
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Optional Fields */}
            {selectedItem.highlights?.length > 0 && (
              <>
                <Typography variant="h6" mt={4}>
                  Highlights
                </Typography>
                <List>
                  {selectedItem.highlights.map((item, idx) => (
                    <ListItem key={idx}>
                      <CheckIcon color="success" sx={{ mr: 1 }} /> {item}
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {selectedItem.detailedOverview && (
              <>
                <Typography variant="h6" mt={4}>
                  Detailed Overview
                </Typography>
                <Typography>{selectedItem.detailedOverview}</Typography>
              </>
            )}

            {selectedItem.itinerary?.length > 0 && (
              <>
                <Typography variant="h6" mt={4}>
                  Suggested Itinerary
                </Typography>
                <List>
                  {selectedItem.itinerary.map((item, idx) => (
                    <ListItem key={idx}>• {item}</ListItem>
                  ))}
                </List>
              </>
            )}

            {/* Includes / Excludes */}
            {(selectedItem.includes?.length > 0 ||
              selectedItem.excludes?.length > 0) && (
              <Grid container spacing={2} mt={4}>
                {selectedItem.includes?.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Includes</Typography>
                    <List>
                      {selectedItem.includes.map((item, idx) => (
                        <ListItem key={idx}>
                          <CheckIcon color="primary" sx={{ mr: 1 }} /> {item}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}

                {selectedItem.excludes?.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Doesn't Include</Typography>
                    <List>
                      {selectedItem.excludes.map((item, idx) => (
                        <ListItem key={idx}>
                          <CloseIcon color="error" sx={{ mr: 1 }} /> {item}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={4}>
            <FromPage />
          </Grid>
        </Grid>
      </Container>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
