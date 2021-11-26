import {
  Backdrop,
  Button,
  Container,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [control, setControl] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, [control]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const handleDelete = (id) => {
    const user = { id };
    fetch("https://car-house-server-side.herokuapp.com/deletecar", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setControl(!control);
        } else {
          setControl(false);
        }
      });
    handleClose();
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: 8 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Engine Power</TableCell>
              <TableCell align="right">Seats</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={row.img} alt="car" style={{ width: "150px" }} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.enginePower}</TableCell>
                <TableCell align="right">{row.carSeats}</TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      height: "30px",
                      width: "30px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={handleOpen}
                    style={{ padding: "5px" }}
                  ></DeleteIcon>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          id="transition-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are you sure you want to delete?
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{ mr: 2 }}
                          onClick={() => handleDelete(row._id)}
                        >
                          Yes
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                          no
                        </Button>
                      </Box>
                    </Fade>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageCars;
