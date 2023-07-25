import { useContext, useState } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  IconButton,
  Typography,
  Icon,
} from "@mui/material";
import Slider from "../../components/slider";
import { Product } from "../../types";
import { Context } from "../_app";
import { observer } from "mobx-react-lite";

const product: Product = {
  id: 1,
  name: "Product 1",
  description: "This is a product",
  prices: [
    {
      currency: "$",
      amount: 100,
    },
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: ["red", "green", "blue"],
  gallery: [
    "https://via.placeholder.com/500",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/50",
    "https://via.placeholder.com/25",
    "https://via.placeholder.com/10",
  ],
  category: "men",
};

const ProductPage = observer(() => {
  const store = useContext(Context);
  const [moneyValue, setMoneyValue] = useState<number | undefined>(
    product.prices.find((price) => price.currency === store.state.currentCurrency)
      ?.amount
  );
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

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
          <Slider gallery={product.gallery} />
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

          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              {product.sizes.map((sizeOption) => (
                <Box
                  key={sizeOption}
                  color={size === sizeOption ? "prfry" : "secondary"}
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
                    backgroundColor: size === sizeOption ? "black" : "inherit",
                    color: size === sizeOption ? "white" : "black",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleSizeChange(sizeOption)}
                >
                  {sizeOption}
                </Box>
              ))}
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
              {product.colors.map((colorOption) => (
                <Box
                  key={colorOption}
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: colorOption,
                    margin: "0.25rem",
                    cursor: "pointer",
                    border: color === colorOption ? "1px solid black" : "none",
                    outline: color === colorOption ? "1px solid green" : "none",
                  }}
                  onClick={() => handleColorChange(colorOption)}
                />
              ))}
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
