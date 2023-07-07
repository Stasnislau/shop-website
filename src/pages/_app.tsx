import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RootLayout from "./layout";
import Store from "../store";
import { createContext } from "react";
const existingRoutes = ["/", "/cart", "/product"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ECE7B",
    },
    secondary: {
      main: "#EEEEEE",
    },
    text: {
      primary: "#000000",
    },
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

// TODO: integrate with main pages