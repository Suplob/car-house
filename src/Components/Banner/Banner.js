import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12} md={6}>
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
  );
};

export default Banner;
