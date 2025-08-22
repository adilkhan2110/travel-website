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
  Skeleton,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useJaipurSightseeing from "../../../store/useJaipurSightseeing";

export default function VisaPage() {
  const { id } = useParams();
  const { selectedItem, isFetchingItemById, getItemById } = useJaipurSightseeing();

  useEffect(() => {
    if (id) {
      getItemById(id);
    }
  }, [id]);

  if (isFetchingItemById || !selectedItem) {
    return (
      <Container sx={{ my: 4 }}>
        <Skeleton variant="text" width="60%" height={50} />
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
          mt={2}
        >
          <Box flex={2}>
            <Skeleton
              variant="rectangular"
              height={250}
              sx={{ borderRadius: 2, mb: 2 }}
            />
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="30%" height={25} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="30%" height={25} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="50%" height={30} sx={{ mt: 4 }} />
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} variant="text" width="100%" height={20} />
            ))}
          </Box>
          <Box flex={1}>
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <main>
      <Container sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedItem.title}
        </Typography>

        <Box
          className="visa-page"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={4}
        >
          <Box flex={2}>
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

            {/* Highlights */}
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

            {/* Detailed Overview */}
            {selectedItem.detailedOverview && (
              <>
                <Typography variant="h6" mt={4}>
                  Detailed Overview
                </Typography>
                <Typography>{selectedItem.detailedOverview}</Typography>
              </>
            )}

            {/* Itinerary */}
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
          </Box>

          <Box flex={1}>
            <FromPage />
          </Box>
        </Box>
      </Container>

      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
