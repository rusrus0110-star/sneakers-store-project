import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import theme from "./theme";
import store from "./store";
import ProductsProvider from "../features/products/provider";

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProductsProvider>{children}</ProductsProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default Providers;
