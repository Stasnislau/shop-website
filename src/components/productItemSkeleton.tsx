import {
  Skeleton,
  ListItem,
  Box,
  Typography,
  ButtonGroup,
  ListItemSecondaryAction,
} from "@mui/material";

const ProductItemSkeleton = () => {
  const mapperSizes = ["1", "2", "3"];
  const mapperColors = ["4", "5", "6"];
  return (
    <ListItem disablePadding>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontFamily="Raleway" fontWeight="600">
          <Skeleton variant="text" width="10rem" />
        </Typography>
        <Typography fontFamily="Raleway" fontWeight="400">
          <Skeleton variant="text" width="10rem" />
        </Typography>
        <Typography fontFamily="Raleway" fontWeight="700">
          <Skeleton variant="text" width="10rem" />
        </Typography>
        <Typography fontFamily="Roboto Condensed" fontWeight="700">
          <Skeleton variant="text" width="10rem" />
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
            {mapperSizes.map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width="2.5rem"
                height="2rem"
              />
            ))}
          </ButtonGroup>
        </Box>
        <Typography fontFamily="Roboto Condensed" fontWeight="700">
          <Skeleton variant="text" width="10rem" />
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
            {mapperColors.map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width="1.5rem"
                height="1.5rem"
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
            <Skeleton variant="rectangular" width="2.5rem" height="2.5rem" />
            <Box display="flex" justifyContent="center" width="100%">
              <Typography
                fontSize="1.5rem"
                fontWeight="500"
                fontFamily="Raleway"
              >
                <Skeleton variant="text" width="2.5rem" />
              </Typography>
            </Box>
            <Skeleton variant="rectangular" width="2.5rem" height="2.5rem" />
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
          <Skeleton variant="rectangular" width="180px" height="178px" />
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProductItemSkeleton;
