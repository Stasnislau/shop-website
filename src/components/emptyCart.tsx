/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import EmptyCartImage from "public/empty-cart.svg"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const EmptyCart = () => {
  const [showText, setShowText] = useState(false);
  setTimeout(() => {
    setShowText(true);
  }, 500);
  console.log(EmptyCartImage)
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        animation: `${fadeIn} 1s ease-in-out`,
      }}
    >
      <img
        src={EmptyCartImage.src}
        alt={"Empty cart"}
        width="180px"
        height="178px"
        
      />
      {showText && (
        <Typography
          variant="h4"
          fontFamily="Roboto"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            color: "#555",
            textShadow: "1px 1px #fff",
            lineHeight: "1.2",
            animation: `${fadeIn} 1s ease-in-out`,
          }}
        >
          Your cart is empty.<br />
          Looks like you need to do<br />
          some shopping!
        </Typography>
      )}
    </Container>
  );
};

export default EmptyCart;