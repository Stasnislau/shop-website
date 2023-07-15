import { Box } from "@mui/material";
import React from "react";

const ItemLoadingComponent = () => {
  return (
    <Box sx={
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        border: "1px solid black",
      }
    }>
      <span className="item-loader"></span>
    </Box>
  );
};

export default ItemLoadingComponent;
