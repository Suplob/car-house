import { Skeleton } from "@mui/material";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading, admin } = useAuth();

  if (isLoading) {
    <>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email && admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
