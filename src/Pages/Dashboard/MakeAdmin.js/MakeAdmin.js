import { Alert, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const MakeAdmin = () => {
  const [success, setSuccess] = useState(false);

  const makeAdmin = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");

    const user = { email };

    fetch(`https://car-house-server-side.herokuapp.com/makeAdmin`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };

  return (
    <div style={{ textAlign: "start" }}>
      <Typography variant="h4" sx={{ mt: 10, mb: 3 }}>
        Enter the email of the user you want to make admin
      </Typography>
      <form onClick={makeAdmin}>
        <TextField
          variant="standard"
          label="email"
          sx={{ width: "70%", mb: 4 }}
          name="email"
          type="email"
          required
        ></TextField>
        <br />
        <Button variant="contained" type="submit">
          Make Admin
        </Button>
      </form>
      {success && (
        <>
          <Alert severity="success" sx={{ mt: 3 }}>
            Admin made successfully
          </Alert>
        </>
      )}
    </div>
  );
};

export default MakeAdmin;
