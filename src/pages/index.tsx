import {
  Grid,
  Card,
  Box,
  Typography,
  Container,
  Pagination,
} from "@mui/material";
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
import NothingToDisplay from "@/components/nothingToDisplay";

const Page = observer(() => {
  const [paginationCount, setPaginationCount] = useState<number>(1);
  const store = useContext(Context);

  const [currentProducts, setCurrentProducts] = useState<extendedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsToShow, setProductsToShow] = useState<extendedProduct[]>([]);
  const LoadingCards = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    setProductsToShow(
      currentProducts.slice((currentPage - 1) * 6, currentPage * 6)
    );
  }, [currentPage, currentProducts]);

  useEffect(() => {
    setPaginationCount(Math.ceil(currentProducts.length / 6));
  }, [currentProducts]);
  const fetchByCategory = async () => {
    try {
      store.setIsLoading(true);
      setCurrentProducts([]);
      const response = await fetch(
        API_URL + `/products/category/${store.state.currentCategory}`
      );
      const data = await response.json();
      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }
      store.setShouldUpdateProducts(false);
      setCurrentProducts(data);
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsLoading(false);
      setCurrentPage(1);
    }
  };
  useEffect(() => {
    startTransition(() => {
      fetchByCategory();
    });
  }, [store.state.currentCategory, store]);
  useEffect(() => {
    if (store.state.shouldUpdateProducts) {
      startTransition(() => {
        fetchByCategory();
      });
    }
  }, [store.state.shouldUpdateProducts]);
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
      <Typography variant="h5" fontFamily="Raleway" fontWeight="400" gutterBottom>
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
          flex : 1,
          overflowY: "scroll",
        }}
      >
        {" "}
        {store.state.isLoading &&
          LoadingCards.map((item, index) => {
            return (
              <Box key={index} height="47%" width="30%">
                <ItemLoadingComponent />
              </Box>
            );
          })}
        {currentProducts.length > 0 &&
          productsToShow.map((item, index) => {
            return (
              <Box key={index} height="47%" width="30%">
                <Suspense fallback={<ItemLoadingComponent />}>
                  <ItemCard
                    onClick={() => {
                      router.push(`/product/${item.id}`);
                    }}
                    item={item}
                  />
                </Suspense>
              </Box>
            );
          })}
        {currentProducts.length === 0 && !store.state.isLoading && (
          <Box
            height="100%"
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NothingToDisplay />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
        }}
      >
        {currentProducts.length > 0 && (
          <Pagination
            onChange={(event, value) => {
              setCurrentPage(value);
            }}
            count={paginationCount}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        )}
      </Box>
    </Box>
  );
});

export default Page;
