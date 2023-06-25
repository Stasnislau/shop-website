import { useState } from "react";
import {
  Box,
  Button,
  Container,
  List,
  Typography,
  Divider,
} from "@mui/material";
import ProductItem from "@/components/productItem";

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Description",
      price: 100,
      image: "https://via.placeholder.com/150",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Green"],
      size: "M",
      color: "Red",
      quantity: 1,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description",
      price: 200,
      image: "https://via.placeholder.com/150",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Green"],
      size: "L",
      color: "Blue",
      quantity: 2,
    },
  ]);
  const currency = "$";
  const handleAddItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  const handleUpdateItem = (id: number, size: string, color: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, size, color } : item
      )
    );
  };
  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalTax = totalPrice * 0.2;

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
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        <Divider />
        {items.map((item) => (
          <ProductItem
            key={item.id}
            item={item}
            onRemoveItem={handleRemoveItem}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </List>
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
            {currency}
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
          <Typography fontFamily="Raleway">Total:{" "}</Typography>
          <Typography
            fontFamily="Raleway"
            sx={{
              fontWeight: 700,
            }}
          >
            {currency}
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
          >
            Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
