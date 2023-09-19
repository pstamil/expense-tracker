import React from "react";
import IncomeExpenses from "./IncomeExpense";
import AddExpense from "./AddExpense";
import Header from "./Header";
import TransactionList from "./TransactionList";
import Balance from "./Balance";
import { Container, Divider, Grid, Typography } from "@mui/material";

//Container style
const style = {
  padding: "35px",
  paddingBottom: "15px",
  borderRadius: "10px",
  backgroundColor: " #e0eafc",
  background: "linear-gradient(to right, #e0eafc, #cfdef3)",
  minHeight: 560,
  position: "relative",
};

function ExpenseTracker() {
  return (
    <Container>
      <Header />
      <Grid container sx={style} gap={4}>
        <Grid item md={12} lg={4} xs={12}>
          <Balance />
          <IncomeExpenses />
          <Divider variant="middle" sx={{ margin: "15px 0" }} />
          <Typography
            varient="h4"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            ADD NEW TRANSACTION
          </Typography>
          <AddExpense />
        </Grid>
        <Grid item md={12} lg={7.6} xs={12}>
          <TransactionList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExpenseTracker;
