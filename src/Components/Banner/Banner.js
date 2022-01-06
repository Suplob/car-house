import { Container, Grid, Typography, Box } from "@mui/material";
import React from "react";

const Banner = () => {
  const backgroundStyle = {
    background:
      "url(https://image.freepik.com/free-vector/blue-curve-background_53876-113112.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginTop: "-80px",
  };
  return (
    <Box style={backgroundStyle}>
      <Container sx={{ mt: 10 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={6} sx={{ textAlign: "start" }}>
            <Typography variant="h2">Want to buy car?</Typography>
            <Typography variant="h5">
              You are in the right place to buy car
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src="https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png"
              alt="car"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
