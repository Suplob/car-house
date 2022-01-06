import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../Components/Header/Header";
import useAuth from "../../hooks/useAuth";

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
  const [loading, setLoading] = React.useState(true);
  const [btnDisable, setBtnDisable] = React.useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/car/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCar(data);
      });
  }, [id]);

  const handleFieldCapture = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newOrder = { ...order };
    newOrder[field] = value;
    setOrder(newOrder);
  };

  const handleOrderSubmit = (e) => {
    setBtnDisable(true);

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
          setBtnDisable(true);
        } else {
          setSuccess(false);
          setBtnDisable(false);
        }
      });

    e.preventDefault();
  };

  console.log(loading);

  return (
    <Box>
      <Header></Header>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container>
          <p variant="h3" style={{ fontWeight: "400", fontSize: "35px" }}>
            Confirm your order
          </p>
          <Grid
            container
            spacing={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} md={6} sx={{ textAlign: "start" }}>
              <img
                src={car.img}
                alt={car.name ? car.name : "A random car"}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
              <Box sx={{ p: 1 }}>
                <Typography variant="h3">{car.name}</Typography>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  ${" "}
                  <span style={{ fontSize: "30px", marginLeft: "5px" }}>
                    {car.price}
                  </span>
                </Typography>
                <Typography variant="h5">Seats: {car.carSeats}</Typography>
                <Typography variant="h5">
                  Engine Power: {car.enginePower}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  required
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
                  required
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
                  required
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
                  required
                />
                {success && (
                  <Alert severity="success" sx={{ mt: 3 }}>
                    Thank you for ordering!
                  </Alert>
                )}
                <br />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3 }}
                  onClick={btnDisable}
                >
                  Order
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default Order;
