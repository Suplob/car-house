import {
  Backdrop,
  Button,
  Container,
  Fade,
  Modal,
  Paper,
  Skeleton,
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box } from "@mui/system";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState(null);
  const [control, setControl] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://car-house-server-side.herokuapp.com/allorders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [control]);

  const handleConfirm = (id) => {
    const user = { id };

    fetch(`https://car-house-server-side.herokuapp.com/confirmOrder`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setControl(!control);
        } else {
          setControl(false);
        }
      });
  };
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
    fetch("https://car-house-server-side.herokuapp.com/deleteorder", {
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
  };

  return (
    <Container>
      <Typography variant="h3">Manage All Orders</Typography>
      {orders === null ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <>
          {orders.length === 0 ? (
            <Typography variant="h4" sx={{ mt: 3 }}>
              There is no order
            </Typography>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Email Address</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Car Name</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Change Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((row) => (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.carName}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{
                                backgroundColor: "green",
                                color: "white",
                                height: "30px",
                                width: "30px",
                                borderRadius: "5px",
                                mr: 2,
                                cursor: "pointer",
                              }}
                              style={{ padding: "5px" }}
                              onClick={() => handleConfirm(row._id)}
                            ></CheckCircleOutlineIcon>
                            <DeleteIcon
                              sx={{
                                backgroundColor: "red",
                                color: "white",
                                height: "30px",
                                width: "30px",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              style={{ padding: "5px" }}
                              onClick={handleOpen}
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
                                    onClick={() => handleDelete(row._id)}
                                    sx={{ mr: 2 }}
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={handleClose}
                                  >
                                    no
                                  </Button>
                                </Box>
                              </Fade>
                            </Modal>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ManageAllOrders;
