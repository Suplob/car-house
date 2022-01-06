import { Container, Grid, Typography, Box } from "@mui/material";
import React from "react";

const AboutUs = () => {
  return (
    <Box sx={{ backgroundColor: "#F8FAFC", py: 3 }}>
      <Container>
        <Typography variant="h3">About Us</Typography>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h4">We are the best in town</Typography>
            <Typography variant="body1">
              A car is a wheeled motor vehicle used for transportation. Most
              definitions of cars say that they run primarily on roads, seat
              one-to-eight people, have four wheels and mainly transport people
              rather than goods.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt=""
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
