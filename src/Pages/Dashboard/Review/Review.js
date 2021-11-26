import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Rating from "react-rating";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Review = () => {
  const { user } = useAuth();
  const [rating, setRate] = useState(0);
  const [success, setSuccess] = useState(false);

  const initialReview = {
    name: user.displayName,
    email: user.email,
    review: "",
  };

  const [reviewData, setRevewData] = useState(initialReview);

  const valueCapture = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newReview = { ...reviewData };
    newReview[field] = value;
    setRevewData(newReview);
  };

  function handleChange(value) {
    setRate(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReviewData = {
      ...reviewData,
      rating,
    };
    fetch(`https://car-house-server-side.herokuapp.com/review`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(finalReviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };

  return (
    <div
      style={{
        textAlign: "start",
      }}
    >
      <form style={{ textAlign: "start" }} onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="Name"
          name="name"
          defaultValue={user.displayName}
          id="standard-basic"
          sx={{ width: "80%", mt: 5 }}
          onBlur={valueCapture}
          required
        ></TextField>
        <TextField
          variant="standard"
          label="Email"
          name="email"
          defaultValue={user.email}
          id="standard-basic"
          sx={{ width: "80%", mt: 5 }}
          onBlur={valueCapture}
          required
        ></TextField>
        <TextField
          id="standard-multiline-static"
          label="Review Comment"
          name="review"
          multiline
          rows={4}
          sx={{ width: "80%", my: 3 }}
          variant="standard"
          onChange={valueCapture}
          required
        />
        <Box>
          <Rating
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            style={{ color: "goldenrod", fontSize: "20px", margin: "10px 0" }}
            name="rating"
            initialRating={rating}
            onChange={handleChange}
            required
          />
        </Box>

        <Button variant="contained" type="submit">
          Sumbit
        </Button>
      </form>
      {success && (
        <>
          <Alert
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
            sx={{ mt: 4 }}
          >
            Review submitted successfully
          </Alert>
        </>
      )}
    </div>
  );
};

export default Review;
