import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  selectDesc,
  selectCategory,
  selectAmount,
  selectIsEdit,
  selectTempId,
  setDesc,
  setCategory,
  setAmount,
  setIsEdit,
  setIsLoading,
} from "../redux/expenseSlice";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";

function AddExpense() {
  const dispatch = useDispatch();
  const expenseDataRef = collection(db, "expensedata");

  const desc = useSelector(selectDesc);
  const category = useSelector(selectCategory);
  const amount = useSelector(selectAmount);

  const isEdit = useSelector(selectIsEdit);
  const tempId = useSelector(selectTempId);

  /* const expenses = useSelector(selectExpense); */

  //UPDATE DATA & ADD DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (desc && category && amount && isEdit) {
      await updateDoc(doc(db, "expensedata", tempId), {
        desc,
        category,
        amount,
        createBy: serverTimestamp(),
      });
      toast.info("Transaction updated!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setDesc(""));
      dispatch(setCategory(""));
      dispatch(setAmount(0));
      dispatch(setIsEdit(false));
    } else {
      const newData = {
        desc: desc,
        category: category,
        amount: Number(amount),
        createBy: serverTimestamp(),
      };
      await addDoc(expenseDataRef, newData);
      toast.success("New Transaction added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setDesc(""));
      dispatch(setAmount(0));
      dispatch(setCategory(""));
    }
  };

  // GET DATA
  useEffect(() => {
    dispatch(setIsLoading(true));
    const queryResponse = query(expenseDataRef, orderBy("createBy", "desc"));

    onSnapshot(queryResponse, (snapShotParam) => {
      dispatch(
        setExpenses(
          snapShotParam.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
      dispatch(setIsLoading(false));
    });
  }, []);

  //SELECT OPTIONS
  const descrptionList = (
    <TextField
      select
      id="description"
      label="Description"
      value={desc}
      onChange={(e) => dispatch(setDesc(e.target.value))}
      required
      size="small"
      fullWidth
      helperText="Select an description"
    >
      <MenuItem value="EMI">EMI</MenuItem>
      <MenuItem value="Salary">Salary</MenuItem>
      <MenuItem value="HomeRent">HomeRent</MenuItem>
      <MenuItem value="Business">Business</MenuItem>
      <MenuItem value="Trading">Trading</MenuItem>
      <MenuItem value="Electricity Bill">Electricity Bill</MenuItem>
      <MenuItem value="Shoping">Shoping</MenuItem>
      <MenuItem value="Savings">Savings</MenuItem>
      <MenuItem value="Medical">Medical</MenuItem>
      <MenuItem value="College Fees">College Fees</MenuItem>
    </TextField>
  );

  const categoryList = (
    <TextField
      select
      required
      id="category"
      label="Category"
      value={category}
      onChange={(e) => dispatch(setCategory(e.target.value))}
      size="small"
      fullWidth
      helperText="Select an category"
    >
      <MenuItem value="Profit">Profit</MenuItem>
      <MenuItem value="Loss">Loss</MenuItem>
    </TextField>
  );

  //BUTTION STYLED
  const ButtonStyled = styled(Button)({
    minWidth: "100px",
    fontSize: "12px",
    padding: "8px",
    marginTop: "10px",
    borderRadius: "3px",
    cursor: "pointer",
  });

  return (
    <>
      <ToastContainer />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "15px",
          gap: "25px",
        }}
        onSubmit={handleSubmit}
      >
        <Grid container gap={{ xs: 3.5, sm: 2.5, md: 3.5, lg: 3.5 }}>
          <Grid item xs={12} sm={6} md={6.5} lg={6}>
            {descrptionList}
          </Grid>
          <Grid item xs={12} sm={5.5} md={5} lg={5}>
            {categoryList}
          </Grid>
        </Grid>
        <TextField
          required
          type="number"
          label="Amount"
          id="amount"
          size="small"
          value={amount}
          onChange={(e) => dispatch(setAmount(e.target.value))}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          helperText={amount === "" ? "Enter valid amount" : ""}
          error={amount === ""}
        />
        <Box>
          {isEdit ? (
            <>
              <ButtonStyled
                size="medium"
                color="secondary"
                variant="outlined"
                sx={{
                  "&:hover": {
                    background: "#4caf50",
                    color: "white",
                    border: "none",
                  },
                }}
                onClick={handleSubmit}
                disabled={!desc || !category || amount <= 0}
              >
                Update
              </ButtonStyled>
              &nbsp;&nbsp;&nbsp;
              <ButtonStyled
                size="medium"
                color="error"
                variant="outlined"
                sx={{
                  "&:hover": {
                    background: "#c0392b",
                    color: "#fff",
                    border: "none",
                  },
                }}
                onClick={() => {
                  dispatch(setIsEdit(false));
                  dispatch(setDesc(""));
                  dispatch(setCategory(""));
                  dispatch(setAmount(0));
                }}
              >
                Cancel ✖
              </ButtonStyled>
            </>
          ) : (
            <ButtonStyled
              size="medium"
              color="secondary"
              variant="outlined"
              sx={{
                "&:hover": {
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                },
              }}
              type="submit"
              disabled={!desc || !category || amount <= 0}
            >
              Add Transaction
            </ButtonStyled>
          )}
        </Box>
      </Box>
    </>
  );
}

export default AddExpense;
