import { AccountBalanceWallet } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Box
      sx={{
        height: "85px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Avatar variant="rounded" sx={{ background: "#fff" }}>
        <AccountBalanceWallet color="primary" />
      </Avatar>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "white",
          fontSize: "33px",
        }}
      >
        Expense Tracker
      </Typography>
    </Box>
  );
}

export default Header;
