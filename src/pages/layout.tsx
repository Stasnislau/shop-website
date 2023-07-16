import { Box } from "@mui/material";
import Header from "../components/header";
import { useContext } from "react";
import { Context } from "../pages/_app";
import ErrorMessageComponent from "@/components/errorMessageComponent";
export const metadata = {
  title: "Staryk Shop",
  description: "Pet shop",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useContext(Context);
  const styles = {
    root: {
      padding: "0 7% 0 7%",
      width: "100wh",
      height: "100vh",
    },
  };
  return (
    <Box sx={styles.root}>
      <Header />
      {store.state.isErrorDisplayed && <ErrorMessageComponent />}
      <div>{children}</div>
    </Box>
  );
}
