import React from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/Theme";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ExpenseTracker />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
