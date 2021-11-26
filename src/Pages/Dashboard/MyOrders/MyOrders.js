import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Modal, Skeleton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const MyOrders = () => {
  const [orders, setOrders] = useState(null);
  const [control, setControl] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user } = useAuth();

  useEffect(() => {
    fetch(
      `https://car-house-server-side.herokuapp.com/myorder?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [control]);

  const handleDelete = (id) => {
    fetch(`https://car-house-server-side.herokuapp.com/deleteorder/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    backgroundColor: "white",
  };

  return (
    <div>
      {orders === null ? (
        <>
          <>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </>
        </>
      ) : (
        <>
          <Typography variant="h3" sx={{ my: 3 }}>
            My Order
          </Typography>
          {orders.length !== 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>My Name</TableCell>
                      <TableCell align="right">Car Name</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Cancel</TableCell>
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
                        <TableCell align="right">{row.carName}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">
                          {row.carName && (
                            <DeleteIcon
                              style={{
                                color: "white",
                                height: "25px",
                                cursor: "pointer",
                                width: "25px",
                                fontSize: "20px",
                                backgroundColor: "red",
                                borderRadius: "5px",
                              }}
                              onClick={handleOpen}
                            ></DeleteIcon>
                          )}
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Are you sure you want to delete your order?
                              </Typography>
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <Button
                                  variant="contained"
                                  sx={{ mr: 2 }}
                                  onClick={() => {
                                    handleDelete(row._id);
                                    handleClose();
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={handleClose}
                                >
                                  No
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            orders.length === 0 && (
              <>
                <Typography variant="h4" sx={{ mt: 5, mb: 1 }}>
                  You haven't ordered anything
                </Typography>
                <Link to="/allCars" className="default-link">
                  <Button variant="contained">Order now</Button>
                </Link>
              </>
            )
          )}
        </>
      )}
    </div>
  );
};

export default MyOrders;
