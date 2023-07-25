import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import { price } from "@prisma/client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type ItemCardProps = {
  item: {
    name: string;
    prices: price[];
    gallery: string[];
  };
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
            onClick={() => {
              console.log("Clicked");
            }}
            sx={{
              position: "absolute",
              backgroundColor: "#5ECE7B",
              bottom: "20%",
              right: "7%",
              ":hover": {
                backgroundColor: "#5ECE7B80",
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
            <Typography fontSize="1rem">{item.name}</Typography>
            <Typography fontSize="1rem" color="text.secondary">
              {store.state.currentCurrency} {moneyValue}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ItemCard;
