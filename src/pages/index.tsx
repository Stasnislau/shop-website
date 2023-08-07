import { Grid, Card, Box, Typography, Container } from "@mui/material";
import ItemCard from "@/components/itemCard";
import { useRouter } from "next/router";
import {
  Suspense,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import ItemLoadingComponent from "@/components/itemLoadingComponent";
import { observer } from "mobx-react-lite";
import { Context } from "../pages/_app";
import { API_URL } from "@/components/header";
import { extendedProduct } from "@/types";

const Page = observer(() => {
  const store = useContext(Context);
  const [currentProducts, setCurrentProducts] = useState<extendedProduct[]>([]);
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        store.setIsLoading(true);
        const response = await fetch(
          API_URL + `/products/category/${store.state.currentCategory}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = (await response.json()) as extendedProduct[];
        setCurrentProducts(data);
      } catch (error) {
        console.log(error);
        store.displayError((error as string) || "Something went wrong");
      } finally {
        store.setIsLoading(false);
      }
    };
    startTransition(() => {
      console.log("fetching currencies");
      fetchCurrencies();
    });
  }, [store.state.currentCategory, store]);
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
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          gap: "4%",
        }}
      >
        {currentProducts.map((item, index) => {
          return (
            <Box key={index} height="49%" width="26%">
              <Suspense fallback={<ItemLoadingComponent />}>
                <ItemCard
                  onClick={() => {
                    router.push("/product");
                  }}
                  item={item}
                />
              </Suspense>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

export default Page;
