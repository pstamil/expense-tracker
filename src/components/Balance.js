import React from "react";
import { selectIncome, selectLoss } from "../redux/expenseSlice";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
function Balance() {
  const income = useSelector(selectIncome);
  const loss = useSelector(selectLoss);
  const total = (income - loss).toFixed(2);
  return (
    <>
      <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
        YOUR BALANCE
      </Typography>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        Rs. {total}
      </Typography>
    </>
  );
}

export default Balance;
