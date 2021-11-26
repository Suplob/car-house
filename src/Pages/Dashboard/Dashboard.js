import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import Pay from "./Pay/Pay";
import MyOrders from "./MyOrders/MyOrders";
import Review from "./Review/Review";
import useAuth from "../../hooks/useAuth";
import MakeAdmin from "./MakeAdmin.js/MakeAdmin";
import AdminRoute from "../../CustomRoutes/AdminRoute";
import AddCar from "./AddCar/AddCar";
import ManageAllOrders from "./ManageAllOrders/ManageAllOrders";
import ManageCars from "./ManageCars/ManageCars";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { handleLogOut, admin } = useAuth();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {admin ? (
          <>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/makeAdmin`}
            >
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Make Admin"} />
              </ListItem>
            </Link>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/addCar`}
            >
              <ListItem button>
                <ListItemIcon>
                  <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Car"} />
              </ListItem>
            </Link>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/manageCars`}
            >
              <ListItem button>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage Cars"} />
              </ListItem>
            </Link>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/manageAllOrders`}
            >
              <ListItem button>
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary={"Manage All Orders"} />
              </ListItem>
            </Link>
            <Divider />
            <ListItem button onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </>
        ) : (
          <>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={"My Orders"} />
              </ListItem>
            </Link>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/pay`}
            >
              <ListItem button>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={"Pay"} />
              </ListItem>
            </Link>
            <Link
              className="default-link"
              style={{ color: "black" }}
              to={`${url}/review`}
            >
              <ListItem button>
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary={"Review"} />
              </ListItem>
            </Link>
            <Divider />
            <ListItem button onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link
              to="/home"
              style={{
                color: "white",
                fontSize: "30px",
                textDecoration: "none",
              }}
            >
              Car House
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Switch>
          <Route exact path={path}>
            <MyOrders></MyOrders>
          </Route>
          <Route path={`${path}/pay`}>
            <Pay></Pay>
          </Route>
          <Route path={`${path}/review`}>
            <Review></Review>
          </Route>
          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
          <AdminRoute path={`${path}/addCar`}>
            <AddCar></AddCar>
          </AdminRoute>
          <AdminRoute path={`${path}/manageAllOrders`}>
            <ManageAllOrders></ManageAllOrders>
          </AdminRoute>
          <AdminRoute path={`${path}/manageCars`}>
            <ManageCars></ManageCars>
          </AdminRoute>
        </Switch>
        <Box></Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
