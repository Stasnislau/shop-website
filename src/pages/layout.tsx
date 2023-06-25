import { Box } from "@mui/material";
import Header from "../components/header";
export const metadata = {
  title: "Staryk Shop",
  description: "Pet shop",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div>{children}</div>
    </Box>
  );
}
