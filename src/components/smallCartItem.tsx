/* eslint-disable @next/next/no-img-element */
import { SmallCartItemProps } from "@/types";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";
import {
  Box,
  Typography,
  IconButton,
  Icon,
  ListItem,
  ListItemText,
  ButtonGroup,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import React, { useState, useContext } from "react";

const SmallCartItem = observer((props: SmallCartItemProps) => {
  const { item, technicalProps } = props;
  const store = useContext(Context);
  return (
    <ListItem disablePadding>
      <IconButton
        aria-label="delete"
        onClick={() => technicalProps.onRemove(item.id)}
        sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
      >
        <Delete />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
          <ListItemText primary={item.name} secondary={item.description} />
          <ListItemText
            primary={`${store.state.currentCurrency}${item.price.amount}`}
          />
          <ListItemText primary={"Size: "} />
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
                color={
                  item.chosenColor === sizeOption ? "primary" : "secondary"
                }
                sx={{
                  border:
                    item.chosenSize === sizeOption
                      ? "1px solid black"
                      : "2px solid black",
                  outline:
                    item.chosenSize === sizeOption ? "1px solid green" : "none",
                  width: "1rem",
                  height: "1rem",
                  margin: "0.25rem",
                  fontSize: "0.5rem",
                  cursor: "pointer",
                  display: "flex",
                  backgroundColor:
                    item.chosenSize === sizeOption ? "black" : "inherit",
                  color: item.chosenSize === sizeOption ? "white" : "black",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => technicalProps.onSizeChange(item.id, sizeOption)}
              >
                {sizeOption}
              </Box>
            ))}
          </ButtonGroup>
          <ListItemText primary={"Color: "} />
          <ButtonGroup
            variant="contained"
            aria-label="color"
            size="small"
            sx={{
              backgroundColor: "inherit",
              boxShadow: "none",
              borderRadius: "0",
            }}
          >
            {item.colors.map((colorOption) => (
              <Box
                key={colorOption}
                sx={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: colorOption,
                  margin: "0.25rem",
                  cursor: "pointer",
                  border:
                    item.chosenColor === colorOption
                      ? "1px solid black"
                      : "none",
                  outline:
                    item.chosenColor === colorOption
                      ? "1px solid green"
                      : "none",
                }}
                onClick={() =>
                  technicalProps.onColorChange(item.id, colorOption)
                }
              />
            ))}
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "8%",
          }}
        >
          <IconButton
            aria-label="add"
            sx={{
              borderRadius: "0",
              border: "1px solid black",
            }}
            onClick={() =>
              technicalProps.onQuantityChange(item.id, item.quantity + 1)
            }
          >
            <Add />
          </IconButton>
          <Typography variant="h6">
            {item.quantity}
          </Typography>
          <IconButton
            sx={{
              border: "1px solid black",
              borderRadius: 0,
            }}
            aria-label="remove"
            onClick={() =>
              technicalProps.onQuantityChange(item.id, item.quantity - 1)
            }
            disabled={item.quantity === 1}
          >
            <Remove />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "40%", justifyContext: "flex-end"}}>
          <img src={item.image} alt={item.name} width="120px" />
        </Box>
      </Box>
    </ListItem>
  );
});

export default SmallCartItem;
