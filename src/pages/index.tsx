import { Grid, Card, Box, Typography, Container } from "@mui/material";
import ItemCard from "@/components/itemCard";
import { useRouter } from "next/router";
import { Suspense } from "react";
import LoadingComponent from "@/components/loadingComponent";

const Page = () => {
  const items = [
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "test",
      price: 100,
      image: "https://via.placeholder.com/150",
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
        border: "1px solid red",
        height: "100vh",
      }}
    >
      {/* <Typography variant="h5" gutterBottom>
        Category Name
      </Typography>
      <Grid container spacing={8} height="50vh">
        <Suspense fallback={<LoadingComponent />}>
          {items.map((item, index) => {
            return (
              <Grid item md={2} lg={4} key={index}>
                <ItemCard
                  onClick={() => {
                    router.push("/product");
                  }}
                  item={item}
                  currency="$"
                  addToCart={() => {
                    console.log("add to cart");
                  }}
                />
              </Grid>
            );
          })}
        </Suspense>
      </Grid> */}
      <LoadingComponent/>
    </Box>
  );
};

export default Page;
