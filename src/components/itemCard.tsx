import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type ItemCardProps = {
  item: any;
  currency: string;
  addToCart: (item: any) => void;
  onClick: () => void;
};

const ItemCard = ({ item, currency, addToCart, onClick }: ItemCardProps) => {
  return (
    <Card
      sx={{
        width: "inherit",
        height: "inherit",
      }}
      onClick={onClick}
    >
      <CardActionArea
        sx={{
          padding: 1,
        }}
      >
        <CardMedia
          component="img"
          height="76%"
          image={item.image}
          alt={item.name}
        />
        <CardContent
          sx={{
            padding: "0.5rem",
            height: "24%",
          }}
        >
          <Box>
            <Typography fontSize="1rem">{item.name}</Typography>
            <Typography fontSize="1rem" color="text.secondary">
              {currency} {item.price}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
