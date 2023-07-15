import { Box } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
  return (
    <Box sx={
      {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }
    }>
      <span className="spinner-loader"></span>
    </Box>
  );
};

export default LoadingSpinner;
