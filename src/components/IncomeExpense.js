import React, { useEffect } from "react";
import {
  selectExpense,
  selectIncome,
  selectLoss,
  setIncome,
  setLoss,
} from "../redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";

function IncomeExpenses() {
  const expenses = useSelector(selectExpense);
  const income = useSelector(selectIncome);
  const loss = useSelector(selectLoss);

  const dispatch = useDispatch();
  //CALULATE AMOUNT
  const calculateExpense = () => {
    let income = 0,
      loss = 0;
    expenses.forEach((data) => {
      if (data.category === "Profit") {
        income += parseInt(data.amount);
      } else if (data.category === "Loss") {
        loss += parseInt(data.amount);
      }
    });
    dispatch(setIncome(income));
    dispatch(setLoss(loss));
  };

  useEffect(() => {
    calculateExpense();
  }, [expenses]);

  const BoxStyle = styled(Box)({
    padding: "18px",
    display: " flex",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "10px 0 25px 0",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  });

  return (
    <BoxStyle>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          INCOME
        </Typography>
        <Typography
          color="secondary"
          variant="body1"
          sx={{
            marginTop: "2px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ₹{income}
        </Typography>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          EXPENSE
        </Typography>
        <Typography
          color="error"
          variant="body1"
          sx={{
            marginTop: "2px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          ₹{loss}
        </Typography>
      </Box>
    </BoxStyle>
  );
}
export default IncomeExpenses;
