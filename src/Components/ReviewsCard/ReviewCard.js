import {
  Card,
  CardContent,
  Container,
  Typography,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const isSm = useMediaQuery("(min-width:0px) and (max-width:899px)");
  const isMd = useMediaQuery("(min-width:900px) and (max-width:1199px)");
  const isLg = useMediaQuery("(min-width:1200px)");

  return (
    <Container sx={{ my: 10 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        What our client's say
      </Typography>

      {isLg && (
        <>
          <Swiper
            spaceBetween={5}
            slidesPerView={3}
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
            className="swiper-container"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Card sx={{ minWidth: 275, textAlign: "start" }}>
                  <CardContent>
                    <Typography variant="h5">{review?.name}</Typography>
                    <Typography variant="body1">{review?.review}</Typography>
                    <Typography variant="body1">{review?.name}</Typography>
                    <Box>
                      <Rating
                        name="read-only"
                        value={review?.rating}
                        readOnly
                      />
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {isMd && (
        <>
          <Swiper
            spaceBetween={5}
            slidesPerView={2}
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
            className="swiper-container"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Card sx={{ minWidth: 275, textAlign: "start" }}>
                  <CardContent>
                    <Typography variant="h5">{review?.name}</Typography>
                    <Typography variant="body1">{review?.review}</Typography>
                    <Typography variant="body1">{review?.name}</Typography>
                    <Box>
                      <Rating
                        name="read-only"
                        value={review?.rating}
                        readOnly
                      />
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {isSm && (
        <>
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
            className="swiper-container"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <Card sx={{ minWidth: 275, textAlign: "start" }}>
                  <CardContent>
                    <Typography variant="h5">{review?.name}</Typography>
                    <Typography variant="body1">{review?.review}</Typography>
                    <Typography variant="body1">{review?.name}</Typography>
                    <Box>
                      <Rating
                        name="read-only"
                        value={review?.rating}
                        readOnly
                      />
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Container>
  );
};

export default ReviewCard;
