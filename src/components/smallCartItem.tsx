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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText primary={item.name} secondary={item.description} />
        <ListItemText primary={`${store.state.currentCurrency}${item.price}`} />
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
              color={item.chosenColor === sizeOption ? "primary" : "secondary"}
              sx={{
                border:
                  item.chosenSize === sizeOption
                    ? "1px solid black"
                    : "2px solid black",
                outline:
                  item.chosenSize === sizeOption ? "1px solid green" : "none",
                width: "2.5rem",
                height: "2rem",
                margin: "0.25rem",
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
      </Box>
    </ListItem>
  );
});

export default SmallCartItem;
