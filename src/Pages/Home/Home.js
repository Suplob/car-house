import React, { useEffect } from "react";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Banner from "../../Components/Banner/Banner";
import Cars from "../../Components/Cars/Cars";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import ReviewCard from "../../Components/ReviewsCard/ReviewCard";

const Home = () => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch("https://car-house-server-side.herokuapp.com/cars")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCars(data);
      });
  }, []);

  return (
    <div>
      <Header></Header>
      <Banner></Banner>
      <Cars cars={cars} slice loading={loading}></Cars>
      <ReviewCard></ReviewCard>
      <AboutUs></AboutUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
