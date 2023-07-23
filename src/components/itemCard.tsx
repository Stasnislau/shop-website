import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";
import { useContext, useEffect, useState } from "react";
import { price } from "@prisma/client";

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
      onClick={onClick}
    >
      <CardActionArea
        sx={{
          padding: 1,
          height: "100%"
        }}
      >
        <CardMedia
          component="img"
          height="76%"
          image={item.gallery[0]}
          alt={item.name}
        />
        <CardContent
          sx={{
            padding: "0.5rem",
            height: "24%",
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
