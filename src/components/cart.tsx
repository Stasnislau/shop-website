import { useEffect, useState, useContext } from "react";
import { Box, Button, Divider, List, Typography } from "@mui/material";
import { API_URL } from "./header";
import { Context } from "@/pages/_app";
import { CartItem, ExtendedCartItem } from "@/types";
import { observer } from "mobx-react-lite";
import SmallCartItem from "./smallCartItem";
import { useRouter } from "next/router";
import useDebounce from "@/hooks/useDebounce";

type CartProps = {
  open: boolean;
};

const Cart = observer(({ open }: CartProps) => {
  const store = useContext(Context);
  const router = useRouter();
  const [products, setProducts] = useState<ExtendedCartItem>(
    {} as ExtendedCartItem
  );
  const onRemove = async (id: number) => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart-item/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      store.setShouldUpdateCart(true);
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  };
  const changeQuantity = useDebounce(async (id: number, quantity: number) => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart-item/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      store.setShouldUpdateCart(true);
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  }, 1000);
  const onQuantityChange = async (id: number, quantity: number) => {
    setProducts((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
    changeQuantity(id, quantity);
  };
  const onSizeChange = async (id: number, size: string) => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart-item/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ size }),
      });
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      store.setShouldUpdateCart(true);
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  };
  const onColorChange = async (id: number, color: string) => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart-item/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color }),
      });
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      store.setShouldUpdateCart(true);
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  };
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
        store.setShouldUpdateCart(false);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (store.state.cartId && store.state.shouldUpdateCart) getCart();
  }, [store.state.cartId, store.state.shouldUpdateCart]);
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    if (!products) return;
    const items = products?.items?.filter((item) => item.quantity > 0);
    setItems(items);
  }, [products]);
  useEffect(() => {
    if (!items) return;
    store.setItemsInCart(0);
    items.forEach((item) => {
      store.setItemsInCart(store.state.itemsInCart + item.quantity);
    });
  }, [items]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!items) return;
    setTotalPrice(0);
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
  }, [items, store.state.currentCurrency]);

  return !open ? null : (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1,
        width: "350px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          padding: "1rem",
          maxHeight: "60vh",
          overflowY: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontSize="2ram" fontFamily="Raleway" color="#1D1F22">
            <b>My bag</b>, {store.state.itemsInCart} items
          </Typography>
        </Box>

        <List
          sx={{
            maxHeight: "40vh",
            overflowY: "scroll",
          }}
        >
          {items &&
            items.length > 0 &&
            items.map((item) => (
              <Box sx={{ position: "relative" }} key={item.id}>
                <SmallCartItem
                  item={{
                    id: item.id,
                    quantity: item.quantity,
                    image: item.product.gallery[0],
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.prices.find(
                      (price) => price.currency === store.state.currentCurrency
                    )!,
                    sizes: item.product.sizes,
                    chosenSize: item.chosenSize,
                    colors: item.product.colors,
                    chosenColor: item.chosenColor,
                  }}
                  technicalProps={{
                    isLoading: loading,
                    onRemove: onRemove,
                    onQuantityChange: onQuantityChange,
                    onSizeChange: onSizeChange,
                    onColorChange: onColorChange,
                  }}
                />
                <Divider
                  sx={{
                    margin: "1rem 0",
                    width: "100%",
                    position: "relative",
                  }}
                />
              </Box>
            ))}
        </List>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography
            fontSize="1rem"
            fontFamily="Roboto"
            fontWeight="500"
            color="black"
          >
            Total:{" "}
          </Typography>
          <Typography
            fontSize="1rem"
            fontFamily="Raleway"
            fontWeight="700"
            color="black"
          >
            {" "}
            {store.state.currentCurrency}
            {totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            rowGap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "45%",
            }}
            onClick={() => {
              router.push("/cart");
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
