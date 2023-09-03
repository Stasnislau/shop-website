/* eslint-disable @next/next/no-img-element */
import { SmallCartItemProps } from "@/types";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";
import {
  Box,
  Typography,
  IconButton,
  Divider,
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
    <ListItem
      disablePadding
      sx={{
        position: "relative",
      }}
    >
      <IconButton
        aria-label="delete"
        onClick={() => technicalProps.onRemove(item.id)}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          gap: "0.5rem",
        }}
      >
        <Delete />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            position: "relative",
            overflowX: "hidden",
            maxWidth: "34%",
          }}
        >
          <Typography
            sx={{
              maxHeight: "1.5rem",
              overflow: "hidden",
              fontFamily: "Raleway",
              fontWeight: "300",
              color: "#1D1F22",
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              maxHeight: "1.5rem",
              overflow: "hidden",
              fontFamily: "Raleway",
              fontWeight: "300",
              color: "#1D1F22",
            }}
          >
            {item.description}
          </Typography>
          <Typography
            sx={{
              maxHeight: "1.5rem",
              overflow: "hidden",
              fontFamily: "Raleway",
              fontWeight: "500",
              color: "#1D1F22",
            }}
          >
            {`${store.state.currentCurrency}${item.price.amount}`}
          </Typography>
          <Typography
            sx={{
              maxHeight: "1.5rem",
              overflow: "hidden",
              fontFamily: "Raleway",
              fontWeight: "400",
              color: "#1D1F22",
            }}
          >
            {"Size: "}
          </Typography>
          <ButtonGroup
            variant="contained"
            aria-label="size"
            size="small"
            sx={{
              backgroundColor: "inherit",
              boxShadow: "none",
              borderRadius: "0",
              overflowX: "hidden",
              flexWrap: "nowrap",
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
                  width: "1.5rem",
                  height: "1.5rem",
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
                  flexShrink: 0,
                  fontFamily: "Source Sans",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={() => technicalProps.onSizeChange(item.id, sizeOption)}
              >
                {sizeOption}
              </Box>
            ))}
          </ButtonGroup>
          <Typography
            sx={{
              maxHeight: "1.5rem",
              overflow: "hidden",
              fontFamily: "Raleway",
              fontWeight: "400",
              color: "#1D1F22",
            }}
          >
            {"Color: "}
          </Typography>
          <ButtonGroup
            variant="contained"
            aria-label="color"
            size="small"
            sx={{
              backgroundColor: "inherit",
              boxShadow: "none",
              borderRadius: "0",
              overflowX: "hidden",
              flexWrap: "nowrap",
            }}
          >
            {item.colors.map((colorOption) => (
              <Box
                key={colorOption}
                sx={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor:
                    colorOption === "white" ? "#e8e6df" : colorOption,
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

                  flexShrink: 0,
                  "&:hover": {
                    border: "1px solid black",
                  },
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
            justifyContent: "space-between",
            alignItems: "center",
            width: "15%",
          }}
        >
          <IconButton
            aria-label="add"
            sx={{
              borderRadius: "0",
              border: "1px solid black",
              width: "24px",
              height: "24px",
            }}
            onClick={() =>
              technicalProps.onQuantityChange(item.id, item.quantity + 1)
            }
          >
            <Add />
          </IconButton>
          <Typography variant="h6">{item.quantity}</Typography>
          <IconButton
            sx={{
              border: "1px solid black",
              borderRadius: 0,
              width: "24px",
              height: "24px",
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "47%",
            justifyContext: "flex-end",
          }}
        >
          <img src={item.image} alt={item.name} width="120px" height="100%" />
        </Box>
      </Box>
    </ListItem>
  );
});

export default SmallCartItem;
