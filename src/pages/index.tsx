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
      <Grid container spacing={8} height="50vh">
        {items.map((item, index) => {
          return (
            <Grid item md={2} lg={4} key={index}>
              {/* <Suspense fallback={<ItemLoadingComponent />}> */}
              <ItemCard
                onClick={() => {
                  router.push("/product");
                }}
                item={item}
              />
              {/* </Suspense> */}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
});

export default Page;
