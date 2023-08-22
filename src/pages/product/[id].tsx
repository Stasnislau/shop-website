import { use, useContext, useEffect, useState, startTransition } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  IconButton,
  Typography,
  Icon,
  Skeleton,
} from "@mui/material";
import Slider from "../../components/slider";
import { Context } from "../_app";
import { observer } from "mobx-react-lite";
import { extendedProduct } from "@/types";
import { API_URL } from "@/components/header";
import { useRouter } from "next/router";

const ProductPage = observer(() => {
  const router = useRouter();

  const { id } = router.query;

  const store = useContext(Context);
  const [product, setProduct] = useState<extendedProduct>(
    {} as extendedProduct
  );
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        store.setIsLoading(true);
        const res = await fetch(`${API_URL}/products/specific/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        setProduct(data);
      } catch (error) {
        console.log(error);
        store.displayError((error as string) || "Something went wrong");
      } finally {
        store.setIsLoading(false);
      }
    };
    startTransition(() => {
      fetchProduct();
    });
  }, [id, store]);
  useEffect(() => {
    if (!product) return;
    setMoneyValue(
      product?.prices?.find(
        (price) => price.currency === store.state.currentCurrency
      )?.amount
    );
  }, [product, store.state.currentCurrency]);

  const [moneyValue, setMoneyValue] = useState<number | undefined>(undefined);
  const [size, setSize] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          height: "63%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "56%",
            position: "relative",
            height: "100%",
          }}
        >
          {!store.state.isLoading ? (
            product && <Slider gallery={product.gallery} />
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <Box>
            <Typography fontFamily="Raleway" variant="h5" fontWeight="700">
              {product.name}
            </Typography>
            <Typography variant="h5" fontFamily="Raleway">
              {product.description}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              variant="h6"
              fontFamily="Roboto Condensed"
              fontWeight="900"
            >
              Size:
            </Typography>
            <ButtonGroup
              variant="contained"
              aria-label="size"
              size="small"
              sx={{
                backgroundColor: "inherit",
                boxShadow: "none",
                borderRadius: "0",
              }}
            >
              {!store.state.isLoading ? (
                product &&
                product?.sizes?.map((sizeOption) => (
                  <Box
                    key={sizeOption}
                    color={size === sizeOption ? "primary" : "secondary"}
                    sx={{
                      border:
                        size === sizeOption
                          ? "1px solid black"
                          : "2px solid black",
                      outline: size === sizeOption ? "1px solid green" : "none",
                      width: "2.5rem",
                      height: "2rem",
                      margin: "0.25rem",
                      cursor: "pointer",
                      display: "flex",
                      backgroundColor:
                        size === sizeOption ? "black" : "inherit",
                      color: size === sizeOption ? "white" : "black",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handleSizeChange(sizeOption)}
                  >
                    {sizeOption}
                  </Box>
                ))
              ) : (
                <Skeleton variant="rectangular" width="2.5rem" height="2rem" />
              )}
            </ButtonGroup>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              fontFamily="Roboto Condensed"
              fontWeight="900"
            >
              Color:
            </Typography>
            <ButtonGroup
              variant="contained"
              aria-label="color"
              size="small"
              sx={{
                backgroundColor: "inherit",
                boxShadow: "none",
              }}
            >
              {!store.state.isLoading ? (
                product?.colors?.map((colorOption) => (
                  <Box
                    key={colorOption}
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: colorOption,
                      margin: "0.25rem",
                      cursor: "pointer",
                      border:
                        color === colorOption ? "1px solid black" : "none",
                      outline:
                        color === colorOption ? "1px solid green" : "none",
                    }}
                    onClick={() => handleColorChange(colorOption)}
                  />
                ))
              ) : (
                <Skeleton
                  variant="rectangular"
                  width="1.5rem"
                  height="1.5rem"
                />
              )}
            </ButtonGroup>
          </Box>
          <Box>
            <Typography
              variant="h6"
              fontFamily="Roboto Condensed"
              fontWeight="900"
            >
              Price:
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Raleway"
              fontWeight="700"
            >{`${store.state.currentCurrency}${moneyValue}`}</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              color: "white",
            }}
          >
            Add to Cart
          </Button>
        </Box>
        <Box />
      </Box>
    </Box>
  );
});

export default ProductPage;
