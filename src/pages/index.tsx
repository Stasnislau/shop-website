import { Grid, Card, Box, Typography, Container } from "@mui/material";
import ItemCard from "@/components/itemCard";
import { useRouter } from "next/router";
import { Suspense, useContext } from "react";
import ItemLoadingComponent from "@/components/itemLoadingComponent";
import { observer } from "mobx-react-lite";
import { Context } from "../pages/_app";

const Page = observer(() => {
  const store = useContext(Context);
  const items = [
    {
      name: "Test1",
      gallery: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/100",
      ],
      prices: [
        {
          id: 1,
          currency: "$",
          amount: 100,
          productId: 1,
        },
        {
          id: 2,
          currency: "€",
          amount: 80,
          productId: 1,
        },
        {
          id: 3,
          currency: "£",
          amount: 70,
          productId: 1,
        },
        {
          id: 4,
          currency: "¥",
          amount: 100000,
          productId: 1,
        },
        
      ],
    },
    {
      name: "Test2",
      gallery: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/100",
      ],
      prices: [
        {
          id: 1,
          currency: "$",
          amount: 110,
          productId: 1,
        },
        {
          id: 2,
          currency: "€",
          amount: 90,
          productId: 1,
        },
        {
          id: 3,
          currency: "£",
          amount: 80,
          productId: 1,
        },
        {
          id: 4,
          currency: "¥",
          amount: 5200000,
          productId: 1,
        },
        
      ],
    },
  ];
  const router = useRouter();
  return (
    <Box
      sx={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        margin: 0,
        height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {store.state.currentCategory.charAt(0).toUpperCase() +
          store.state.currentCategory.slice(1)}
      </Typography>
      <Box sx={{ height: "80vh", display: "flex", width: "100%", flexWrap: "wrap", gap: "8%" }}>
        {items.map((item, index) => {
          return (
            <Box key={index} height="49%" width="26%">
              {/* <Suspense fallback={<ItemLoadingComponent />}> */}
              <ItemCard
                onClick={() => {
                  router.push("/product");
                }}
                item={item}
              />
              {/* </Suspense> */}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

export default Page;
