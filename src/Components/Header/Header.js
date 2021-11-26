import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import TemporaryDrawer from "./TemporaryDrawer";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const theme2 = useTheme();

  const { user, handleLogOut, admin } = useAuth();
  const { email } = user;
  const isMatched = useMediaQuery(theme2.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/home" className="default-link">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              Car House
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {isMatched ? (
            <TemporaryDrawer></TemporaryDrawer>
          ) : email ? (
            <>
              <Button color="inherit" sx={{ fontWeight: "700" }}>
                {user.displayName}
              </Button>
              <Link to="/allCars" className="default-link">
                <Button color="inherit">All Cars</Button>
              </Link>
              {!admin ? (
                <>
                  <Link className="default-link" to="/dashboard">
                    <Button color="inherit">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="default-link" to="/dashboard/makeAdmin">
                    <Button color="inherit">Dashboard</Button>
                  </Link>
                </>
              )}
              <Button color="inherit" onClick={handleLogOut}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/allCars" className="default-link">
                <Button color="inherit">All Cars</Button>
              </Link>
              <Link to="/register" className="default-link">
                <Button color="inherit">Register</Button>
              </Link>

              <Link to="/login" className="default-link">
                <Button color="inherit">Login</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
