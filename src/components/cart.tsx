import { Suspense, useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { API_URL } from "./header";
import { Context } from "@/pages/_app";
import { CartItem, ExtendedCartItem } from "@/types";
import { observer } from "mobx-react-lite";

type CartProps = {
  open: boolean;
};

const Cart = observer(({ open }: CartProps) => {
  const store = useContext(Context);
  const [products, setProducts] = useState<ExtendedCartItem>(
    {} as ExtendedCartItem
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCart() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/cart/get/${store.state.cartId}`);
        const data = await res.json();
        if (res.status < 200 || res.status > 299) {
          throw new Error(data.message);
        }
        setProducts(data);
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (store.state.cartId) getCart();
  }, [store.state.cartId]);
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    if (!products) return;
    const items = products?.items?.filter((item) => item.quantity > 0);
    setItems(items);
  }, [products]);
  useEffect(() => {
    if (!items) return;
    items.forEach((item) => {
      store.setItemsInCart(store.state.itemsInCart + item.quantity);
    });
  }, [items]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!items) return;
    items.forEach((item) => {
      setTotalPrice(
        (prev) =>
          prev +
          (item?.product?.prices?.find(
            (price) => price.currency === store?.state?.currentCurrency
          )?.amount ?? 0) *
            (item?.quantity ?? 0)
      );
    });
  }, [items]);

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
            <b>My bag</b>, {store.state.itemsInCart} items
          </Typography>
        </Box>

        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <Suspense fallback={ <Skeleton />}>
                <ListItemAvatar>
                  <Image
                    src={item.product.gallery[0]}
                    alt={item.product.name}
                    width={64}
                    height={64}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.product.name}
                  secondary={`${
                    item.product.prices.find(
                      (price) =>
                        price.currency === store?.state?.currentCurrency
                    )?.amount
                  } x ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1">
                    {store.state.currentCurrency}{" "}
                    {item?.quantity ??
                      0 *
                        (item?.product?.prices?.find(
                          (price) =>
                            price.currency === store?.state?.currentCurrency
                        )?.amount ?? 0)}
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
            {store.state.currentCurrency}
            {totalPrice}
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
});

export default Cart;
