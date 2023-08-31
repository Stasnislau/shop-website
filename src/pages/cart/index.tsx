import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  List,
  Typography,
  Divider,
} from "@mui/material";
import ProductItem from "@/components/productItem";
import { API_URL } from "@/components/header";
import { Context } from "@/pages/_app";
import { observer } from "mobx-react-lite";
import { CartItem } from "@/types";
import useDebounce from "@/hooks/useDebounce";
import { set } from "lodash";

const CartPage = observer(() => {
  const store = useContext(Context);
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    store.setShouldUpdateCart(true);
  }, [store]);
  const buyProducts = async () => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart/buy/${store.state.cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      setItems([]);
      store.setShouldUpdateCart(true);
      store.displaySuccess(data.message);
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
        store.setShouldUpdateCart(true);
        throw new Error(data.message);
      }
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  }, 1000);

  useEffect(() => {
    async function getCart() {
      if (!store.state.shouldUpdateCart) return;
      try {
        store.setIsLoading(true);
        const res = await fetch(`${API_URL}/cart/get/${store.state.cartId}`);
        const data = await res.json();
        if (res.status < 200 || res.status > 299) {
          throw new Error(data.message);
        }
        const items = data.items.filter((item: CartItem) => item.quantity > 0);
        setItems(items);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        store.setIsLoading(false);
      }
    }
    if (store.state.cartId) {
      getCart();
    }
  }, [store.state.cartId, store.state.shouldUpdateCart, store]);
  const handleChangeQuantity = async (id: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    changeQuantity(id, quantity);
  };

  const handleUpdateItem = async (id: number, size: string, color: string) => {
    try {
      store.setIsBeingSubmitted(true);
      const res = await fetch(`${API_URL}/cart-item/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chosenColor: color, chosenSize: size }),
      });
      const data = await res.json();
      if (res.status < 200 || res.status > 299) {
        throw new Error(data.message);
      }
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, chosenColor: color, chosenSize: size }
            : item
        )
      );
    } catch (error: any) {
      store.displayError(error.message);
    } finally {
      store.setIsBeingSubmitted(false);
    }
  };
  const handleDeleteItem = async (id: number) => {
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

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              backgroundColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
            }}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              {items.length}
            </Typography>
          </Box>
          Cart
        </Box>
      </Typography>
      <Divider />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Box key={index}>
              <ProductItem
                key={item.id}
                item={{
                  id: item.id,
                  name: item.product.name,
                  description: item.product.description,
                  price: item.product.prices.find(
                    (price) => price.currency === store.state.currentCurrency
                  )!,
                  sizes: item.product.sizes,
                  colors: item.product.colors,
                  image: item.product.gallery[0],
                  quantity: item.quantity,
                  chosenSize: item.chosenSize,
                  chosenColor: item.chosenColor,
                }}
                onChangeQuantity={handleChangeQuantity}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
              />
              {index !== items.length - 1 && <Divider />}
            </Box>
          ))}
      </List>
      <Box>
        <Divider sx={{ width: "100%" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            fontSize: "1.2rem",
            width: "max-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontFamily="Raleway">Tax 21%: </Typography>
            <Typography
              fontFamily="Raleway"
              sx={{
                fontWeight: 700,
              }}
            >
              {store.state.currentCurrency}
              {(totalPrice * 0.21).toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography fontFamily="Raleway">Quantity: </Typography>
            <Typography
              fontFamily="Raleway"
              sx={{
                fontWeight: 700,
              }}
            >
              {items.reduce((total, item) => total + item.quantity, 0)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontFamily="Raleway">Total: </Typography>
            <Typography
              fontFamily="Raleway"
              sx={{
                fontWeight: 700,
              }}
            >
              {store.state.currentCurrency}
              {totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "white",
                width: "100%",
              }}
              onClick={buyProducts}
            >
              Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default CartPage;


