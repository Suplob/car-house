import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";

const Cars = ({ cars, slice }) => {
  return (
    <Box sx={{ mt: 20 }}>
      <Container>
        <Grid container spacing={2}>
          {slice ? (
            <>
              {cars.slice(0, 6).map((car) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={car._id}
                  sx={{
                    mb: 5,
                    margin: "0 auto",
                  }}
                >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={car.img}
                        alt="green iguana"
                      />
                      <CardContent sx={{ textAlign: "start" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {car.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <AttachMoneyIcon></AttachMoneyIcon> {car.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", my: 1 }}
                        >
                          <EventSeatIcon
                            sx={{ marginRight: "5px" }}
                          ></EventSeatIcon>{" "}
                          {car.carSeats}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <ElectricCarIcon
                            sx={{ marginRight: "5px" }}
                          ></ElectricCarIcon>{" "}
                          {car.enginePower}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Divider />
                    <CardActions>
                      <Link to={`/order/${car._id}`} className="default-link">
                        <Button
                          size="small"
                          color="primary"
                          sx={{ fontSize: "15px" }}
                        >
                          Order
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <Grid container spacing={2} sx={{ mb: 5 }}>
                {cars.map((car) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={car._id}
                    sx={{
                      mb: 5,
                      margin: "0 auto",
                    }}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={car.img}
                          alt="green iguana"
                        />
                        <CardContent sx={{ textAlign: "start" }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {car.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <AttachMoneyIcon></AttachMoneyIcon> {car.price}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              my: 1,
                            }}
                          >
                            <EventSeatIcon
                              sx={{ marginRight: "5px" }}
                            ></EventSeatIcon>{" "}
                            {car.carSeats}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <ElectricCarIcon
                              sx={{ marginRight: "5px" }}
                            ></ElectricCarIcon>{" "}
                            {car.enginePower}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Divider />
                      <CardActions>
                        <Link to={`/order/${car._id}`} className="default-link">
                          <Button
                            size="small"
                            color="primary"
                            sx={{ fontSize: "15px" }}
                          >
                            Order
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Cars;
