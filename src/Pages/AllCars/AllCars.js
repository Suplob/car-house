import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cars from "../../Components/Cars/Cars";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const AllCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://car-house-server-side.herokuapp.com/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div>
      <Header></Header>
      <Typography variant="h2" sx={{ my: 4 }}>
        All Cars
      </Typography>
      <Cars cars={cars}></Cars>
      <Footer></Footer>
    </div>
  );
};

export default AllCars;
