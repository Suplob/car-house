import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.primary.dark
              : theme.palette.grey[800],
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">&copy; Suplob Roy || 2021</Typography>
          {/* <Copyright /> */}
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
