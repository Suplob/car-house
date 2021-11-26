import { Alert, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";

const AddCar = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("false");

  const handleCarAdd = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const img = data.get("img");
    const enginePower = data.get("enginePower");
    const carSeats = data.get("carSeats");
    const price = data.get("price");

    const carData = {
      name,
      img,
      enginePower,
      carSeats,
      price,
    };

    console.log(carData);

    fetch(`https://car-house-server-side.herokuapp.com/addcar`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(carData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  };
  return (
    <Container>
      <form
        style={{ marginTop: "50px", textAlign: "start" }}
        onSubmit={handleCarAdd}
      >
        <TextField
          variant="standard"
          label="Car Name"
          name="name"
          sx={{ width: "85%" }}
        ></TextField>
        <TextField
          variant="standard"
          label="Car Image Link"
          name="img"
          sx={{ width: "85%", mt: 4 }}
        ></TextField>
        <TextField
          variant="standard"
          label="Car Price"
          name="price"
          sx={{ width: "85%", mt: 4 }}
          type="number"
        ></TextField>
        <TextField
          variant="standard"
          label="Engine Power"
          name="enginePower"
          sx={{ width: "85%", mt: 4 }}
          type="number"
        ></TextField>
        <TextField
          variant="standard"
          label="Car Seats"
          name="carSeats"
          sx={{ width: "85%", mt: 4 }}
          type="number"
        ></TextField>
        <br />
        <Button variant="contained" type="submit" sx={{ mt: 3 }}>
          Add Car
        </Button>
      </form>
      {success && (
        <>
          <Alert severity="success" sx={{ mt: 3 }}>
            Car Addedd Successfully
          </Alert>
        </>
      )}
      {error === true && (
        <Alert severity="error" sx={{ mt: 3 }}>
          There was an error adding car
        </Alert>
      )}
    </Container>
  );
};

export default AddCar;
