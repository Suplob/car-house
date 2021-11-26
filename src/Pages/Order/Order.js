import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../Components/Header/Header";
import useAuth from "../../hooks/useAuth";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Order = () => {
  const { user } = useAuth();

  const initialOrder = {
    name: user.displayName,
    email: user.email,
    phoneNumber: "",
    address: "",
  };

  const [order, setOrder] = React.useState(initialOrder);
  const [car, setCar] = React.useState({});
  const [success, setSuccess] = React.useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/car/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, []);

  const handleFieldCapture = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newOrder = { ...order };
    newOrder[field] = value;
    setOrder(newOrder);
  };

  const handleOrderSubmit = (e) => {
    const insertOrder = {
      ...order,
      carName: car.name,
      status: "Pending",
    };
    fetch(`https://car-house-server-side.herokuapp.com/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(insertOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
    e.preventDefault();
  };

  return (
    <Box>
      <Header></Header>

      <Container
        sx={{ mt: 20, backgroundColor: "#F8F9FA", borderRadius: "5px" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={6}>
            <img
              src={car.img}
              alt="car"
              style={{ width: "100%", height: "60vh" }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "start", my: 1 }}>
            <Typography variant="h2" sx={{ marginLeft: "20px" }}>
              {car.name}
            </Typography>
            <Typography variant="h5" sx={{ marginLeft: "20px" }}>
              ${car.price}
            </Typography>
            <form onSubmit={handleOrderSubmit} style={{ marginLeft: "20px" }}>
              <TextField
                id="standard-basic"
                label="Name"
                defaultValue={user.displayName}
                name="name"
                variant="standard"
                onBlur={handleFieldCapture}
                sx={{
                  width: "75%",
                  mt: 2,
                  background: "white",
                  borderRadius: "5px",
                }}
              />
              <TextField
                id="standard-basic"
                label="Email"
                defaultValue={user.email}
                name="email"
                variant="standard"
                onBlur={handleFieldCapture}
                sx={{
                  width: "75%",
                  mt: 2,
                  background: "white",
                  borderRadius: "5px",
                }}
              />
              <TextField
                id="standard-basic"
                label="Phone"
                name="phoneNumber"
                variant="standard"
                onBlur={handleFieldCapture}
                sx={{
                  width: "75%",
                  mt: 2,
                  background: "white",
                  borderRadius: "5px",
                }}
              />

              <TextField
                id="standard-multiline-static"
                label="Address"
                multiline
                rows={4}
                variant="standard"
                name="address"
                sx={{
                  width: "75%",
                  mt: 2,
                  background: "white",
                  borderRadius: "5px",
                }}
                onChange={handleFieldCapture}
              />
              <br />
              <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                Order
              </Button>
            </form>

            {success && (
              <Alert
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
              >
                Order added successfully
              </Alert>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Order;
