import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete,
} from "@mui/icons-material";
import { Context } from "../pages/_app";

type ProductItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    image: string;
    quantity: number;
  };
  onRemoveItem: (id: number) => void;
  onAddItem: (id: number) => void;
  onUpdateItem: (id: number, size: string, color: string) => void;
  onDeleteItem: (id: number) => void;
};

const ProductItem = observer(
  ({
    item,
    onRemoveItem,
    onAddItem,
    onUpdateItem,
    onDeleteItem,
  }: ProductItemProps) => {
    const [size, setSize] = useState(item.sizes[0]);
    const [color, setColor] = useState(item.colors[0]);
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
      <ListItem
        disablePadding
        sx={{
          padding: "1rem 0",
        }}
      >
        <IconButton
          aria-label="delete"
          onClick={() => onDeleteItem(item.id)}
          sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
        >
          <Delete />
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <ListItemText primary={item.name} secondary={item.description} />
          <ListItemText
            primary={`${store.state.currentCurrency}${item.price}`}
          />
          <ListItemText primary={"Size:"} />
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
                  }}
                  onClick={() => handleSizeChange(sizeOption)}
                >
                  {sizeOption}
                </Box>
              ))}
            </ButtonGroup>
          </Box>
          <ListItemText primary={"Color:"} />
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
                height: "80%",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                aria-label="add"
                sx={{
                  borderRadius: "0",
                  border: "1px solid black",
                }}
                onClick={() => onAddItem(item.id)}
              >
                <AddIcon />
              </IconButton>
              <Typography variant="h6" sx={{ margin: "0 1rem" }}>
                {item.quantity}
              </Typography>
              <IconButton
                sx={{
                  border: "1px solid black",
                  borderRadius: 0,
                }}
                aria-label="remove"
                onClick={() => onRemoveItem(item.id)}
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
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "auto", height: "80%" }}
            />
          </Box>
        </ListItemSecondaryAction>
        <Divider
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        />
      </ListItem>
    );
  }
);

export default ProductItem;
