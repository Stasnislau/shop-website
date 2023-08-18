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
import { set } from "mobx";
import NothingToDisplay from "@/components/nothingToDisplay";

const Page = observer(() => {
  const [paginationCount, setPaginationCount] = useState<number>(1);
  const store = useContext(Context);

  const [currentProducts, setCurrentProducts] = useState<extendedProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsToShow, setProductsToShow] = useState<extendedProduct[]>([]);
  useEffect(() => {
    setProductsToShow(
      currentProducts.slice((currentPage - 1) * 6, currentPage * 6)
    );
  }, [currentPage, currentProducts]);

  useEffect(() => {
    setPaginationCount(Math.ceil(currentProducts.length / 6));
  }, [currentProducts]);
  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        store.setIsLoading(true);
        setCurrentProducts([]);
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
      fetchByCategory();
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
        {currentProducts.length > 0 ? (
          productsToShow.map((item, index) => {
            console.log(item.gallery);
            return (
              <Box key={index} height="49%" width="30%">
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
          })
        ) : (
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
          />
        )}
      </Box>
    </Box>
  );
});

export default Page;
