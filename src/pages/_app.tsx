import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RootLayout from "./layout";
import Store from "../store";
import { createContext } from "react";
const existingRoutes = ["/", "/cart", "/product"];
import "./styles.css";
import { info } from "console";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ECE7B",
    },
    secondary: {
      main: "#EEEEEE",
    },
    text: {
      primary: "#1D1F22",
    },
    common: {
      black: "#1D1F22"
    },
    info: {
      main: "#1D1F22"
    }
  },
});
const store = new Store();
export const Context = createContext(store);

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: React.FC }) {
  useEffect(() => {
    if (!existingRoutes.includes(Router.pathname)) {
      Router.push("/");
    }
  }, []);
  return (
    <Context.Provider value={store}>
      <ThemeProvider theme={theme}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </Context.Provider>
  );
}
