import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  desc: "",
  category: "",
  amount: 0,
  expenses: [],
  isEdit: false,
  tempId: null,
  income: 0,
  loss: 0,
  currentPage: 1,
  confirm: false,
  deleteId: null,
  isLoading: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
    setIncome: (state, action) => {
      state.income = action.payload;
    },
    setLoss: (state, action) => {
      state.loss = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setConfirm: (state, action) => {
      state.confirm = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const selectExpense = (state) => state.expense.expenses;
export const selectDesc = (state) => state.expense.desc;
export const selectCategory = (state) => state.expense.category;
export const selectAmount = (state) => state.expense.amount;

export const selectIsEdit = (state) => state.expense.isEdit;
export const selectTempId = (state) => state.expense.tempId;

export const selectIncome = (state) => state.expense.income;
export const selectLoss = (state) => state.expense.loss;
export const selectCurrentPage = (state) => state.expense.currentPage;

export const selectConfirm = (state) => state.expense.confirm;
export const selectDeleteId = (state) => state.expense.deleteId;

export const selectIsLoading = (state) => state.expense.isLoading;

export const {
  setDesc,
  setCategory,
  setAmount,
  setExpenses,
  setTempId,
  setIsEdit,
  setIncome,
  setLoss,
  setCurrentPage,
  setConfirm,
  setDeleteId,
  setIsLoading,
} = expenseSlice.actions;

export default expenseSlice.reducer;
