/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete,
} from "@mui/icons-material";
import { Context } from "../pages/_app";
import { Price } from "@/types";

type ProductItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
    price: Price;
    sizes: string[];
    colors: string[];
    image: string;
    quantity: number;
    chosenSize: string;
    chosenColor: string;
  };
  onChangeQuantity: (id: number, quantity: number) => void;
  onUpdateItem: (id: number, size: string, color: string) => void;
  onDeleteItem: (id: number) => void;
};

const ProductItem = observer(
  ({
    item,
    onChangeQuantity,
    onUpdateItem,
    onDeleteItem,
  }: ProductItemProps) => {
    const [size, setSize] = useState(item.chosenSize);
    const [color, setColor] = useState(item.chosenColor);
    const store = useContext(Context);

    const handleSizeChange = (newSize: string) => {
      setSize(newSize);
      onUpdateItem(item.id, newSize, color);
    };

    const handleColorChange = (newColor: string) => {
      setColor(newColor);
      onUpdateItem(item.id, size, newColor);
    };
    return (
      <ListItem disablePadding>
        <IconButton
          aria-label="delete"
          onClick={() => onDeleteItem(item.id)}
          sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
        >
          <Delete />
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography fontFamily="Raleway" fontWeight="600">
            {item.name}
          </Typography>
          <Typography fontFamily="Raleway" fontWeight="400">
            {item.description}
          </Typography>
          <Typography fontFamily="Raleway" fontWeight="700">
            {store.state.currentCurrency} {item.price.amount}
          </Typography>
          <Typography fontFamily="Roboto Condensed" fontWeight="700">
            Size:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              {item.sizes.map((sizeOption) => (
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
                    backgroundColor: size === sizeOption ? "black" : "inherit",
                    color: size === sizeOption ? "white" : "black",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Source Sans",
                    fontWeight: "400",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={() => handleSizeChange(sizeOption)}
                >
                  {sizeOption}
                </Box>
              ))}
            </ButtonGroup>
          </Box>
          <Typography fontFamily="Roboto Condensed" fontWeight="700">
            Color:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ButtonGroup
              variant="contained"
              aria-label="color"
              size="small"
              sx={{
                backgroundColor: "inherit",
                boxShadow: "none",
              }}
            >
              {item.colors.map((colorOption) => (
                <Box
                  key={colorOption}
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor:
                      colorOption === "white" ? "#e8e6df" : colorOption,
                    margin: "0.25rem",
                    cursor: "pointer",
                    fontFamily: "Raleway",
                    border: color === colorOption ? "1px solid black" : "none",
                    outline: color === colorOption ? "1px solid green" : "none",
                    "&:hover": {
                      border: "1px solid black",
                    },
                  }}
                  onClick={() => handleColorChange(colorOption)}
                />
              ))}
            </ButtonGroup>
          </Box>
        </Box>
        <ListItemSecondaryAction
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          <Box
            sx={{
              margin: "0 1rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-end",
              marginBottom: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                height: "90%",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                aria-label="add"
                sx={{
                  borderRadius: "0",
                  border: "1px solid black",
                  flexShrink: 0,
                  width: "2.5rem",
                  height: "2.5rem",
                }}
                onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
              <Box display="flex" justifyContent="center" width="100%">
                <Typography
                  fontSize="1.5rem"
                  fontWeight="500"
                  fontFamily="Raleway"
                >
                  {item.quantity}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  border: "1px solid black",
                  borderRadius: 0,
                  width: "2.5rem",
                  height: "2.5rem",
                }}
                aria-label="remove"
                onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
              marginBottom: "1.5rem",
              marginRight: "1rem",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              width="180px"
              height="178px"
            />
          </Box>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
);

export default ProductItem;
