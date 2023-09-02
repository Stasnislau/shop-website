import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { extendedProduct } from "@/types";
import { API_URL } from "./header";

type ItemCardProps = {
  item: extendedProduct;
  onClick: () => void;
};

const ItemCard = observer(({ item, onClick }: ItemCardProps) => {
  const store = useContext(Context);
  const [moneyValue, setMoneyValue] = useState<number | undefined>(
    item.prices.find((price) => price.currency === store.state.currentCurrency)
      ?.amount
  );
  const [isCartShown, setIsCartShown] = useState(false);
  useEffect(() => {
    setMoneyValue(
      item.prices.find(
        (price) => price.currency === store.state.currentCurrency
      )?.amount
    );
  }, [store.state.currentCurrency]);

  const handleAddToCart = async () => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(
        `${API_URL}/cart-item/add/${store.state.cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: store.state.cartId,
            productId: item.id,
            quantity: 1,
            chosenSize: item.sizes[0],
            chosenColor: item.colors[0],
          }),
        }
      );
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      store.setShouldUpdateCart(true);
      store.displaySuccess("Item added to cart");
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
      }}
      onMouseEnter={() => {
        setIsCartShown(true);
      }}
      onMouseLeave={() => {
        setIsCartShown(false);
      }}
      onClick={onClick}
    >
      <CardActionArea
        sx={{
          padding: 1,
          height: "100%",
        }}
      >
        <CardMedia
          sx={{
            position: "relative",
          }}
          component="img"
          height="80%"
          image={item.gallery[0]}
          alt={item.name}
        />
        {isCartShown && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            sx={{
              position: "absolute",
              backgroundColor: "#5ECE7B",
              bottom: "15%",
              right: "7%",
              ":hover": {
                backgroundColor: "#409455",
              },
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )}
        <CardContent
          sx={{
            padding: "0.5rem",
            height: "20%",
          }}
        >
          <Box>
            <Typography
              fontSize="1rem"
              fontFamily="Raleway"
              fontWeight="300"
              color="#1D1F22"
            >
              {item.name}
            </Typography>
            <Typography
              fontSize="1rem"
              fontFamily="Raleway"
              fontWeight="500"
              color="#1D1F22"
            >
              {store.state.currentCurrency} {moneyValue}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ItemCard;
