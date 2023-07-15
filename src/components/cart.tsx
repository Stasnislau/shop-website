import { Suspense, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
// import { Product } from "./types";
import LoadingComponent from "./itemLoadingComponent";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "../../public/tess.svg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image: "../../public/tess.svg",

    quantity: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image: "../../public/tess.svg",
    quantity: 3,
  },
];
type CartProps = {
  //   items: any[]; // Product[];
  open: boolean;
  currency: string;
};

const Cart = ({ open, currency }: CartProps) => {
  const items = products.filter((item) => item.quantity > 0);
  let numItems = 0;
  items.forEach((item) => {
    numItems += item.quantity;
  });
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return !open ? null : (
    <Box
      sx={{
        position: "absolute",
        top: "105%",
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        width: "min(22.5%, max-content)",
        Height: "40%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          overflowY: "auto",
          width: "100%",
          p: 2,
          padding: "1rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="2ram" fontFamily="Raleway" color="#1D1F22">
            <b>My bag</b>, {numItems} items
          </Typography>
        </Box>

        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Suspense fallback={<LoadingComponent />}>
                <ListItemAvatar>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price} x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1">
                    ${item.price * item.quantity}
                  </Typography>
                </ListItemSecondaryAction>
              </Suspense>
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography fontSize="1rem">Total: </Typography>
          <Typography fontSize="1rem">
            {" "}
            {currency}
            {total}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            rowGap: 3,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "45%",
            }}
          >
            View Bag
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#5ECE7B",
              width: "45%",
              color: "white",
              "&:hover": {
                backgroundColor: "#5ECE7B",
              },
            }}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
