import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";

const store = configureStore({
  reducer: {
    expense: expenseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
