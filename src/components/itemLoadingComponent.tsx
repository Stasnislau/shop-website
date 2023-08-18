import { Height } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";

const ItemLoadingComponent = () => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <CardActionArea
        sx={{
          padding: 1,
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
          height="80%"
        >
          <Skeleton variant="rectangular" height="100%" />
        </Box>
        <CardContent
          sx={{
            padding: "0.5rem",
            height: "20%",
          }}
        >
          <Box>
            <Typography fontSize="1rem">
              <Skeleton />
            </Typography>
            <Typography fontSize="1rem" color="text.secondary">
              <Skeleton />
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemLoadingComponent;
