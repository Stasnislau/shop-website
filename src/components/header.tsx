import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import {
  AppBar,
  Tab,
  Tabs,
  Icon,
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import shopLogo from "../../public/shop-logo.svg";
import cartIcon from "../../public/cart-icon.svg";
import Cart from "./cart";
import CreateProduct from "./createProduct";
import { ProductToCreate } from "../types";
import { Context } from "@/pages/_app";
import { useRouter } from "next/router";
import LoadingSpinner from "./loadingSpinner";

const Header = () => {
  const navigate = useRouter();
  const store = React.useContext(Context);
  const [value, setValue] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const handleCurrencySelect = (currency: string) => {
    store.setCurrentCurrency(currency);
    setIsCurrencyMenuOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("cart-open", isCartOpen);
  }, [isCartOpen]);
  const availableCurrencies = [
    { currency: "$", exchangeRate: 1.0, currencyCode: "USD" },
    { currency: "€", exchangeRate: 1.18, currencyCode: "EUR" },
    { currency: "£", exchangeRate: 1.38, currencyCode: "GBP" },
    { currency: "¥", exchangeRate: 0.0091, currencyCode: "JPY" },
  ];
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "none", paddingBottom: "1%" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            width: "33%",
            "& .MuiTab-root": {
              borderBottom: "2px solid transparent",
              transition: "none",
              "&:hover": {
                borderBottom: "2px solid",
                borderColor: (theme) => theme.palette.secondary.main,
              },
            },
            "& .Mui-selected": {
              borderBottom: "2px solid",
              borderColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <Tab value={0} label="Men" />
          <Tab value={1} label="Women" />
          <Tab value={2} label="Kids" />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "33%",
          }}
        >
          <Icon
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "fit-content",
              height: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate.push("/");
            }}
          >
            <Image src={shopLogo} alt="shop icon" />
          </Icon>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "33%",
          }}
        >
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setIsCreateProductOpen(true)}
          >
            <AddIcon />
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            onMouseEnter={() => setIsCurrencyMenuOpen(true)}
            onMouseLeave={() => setIsCurrencyMenuOpen(false)}
            sx={{ position: "relative" }}
          >
            <Typography variant="body1">
              {store.state.currentCurrency}
            </Typography>
            {isCurrencyMenuOpen && (
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  width: "max-content",
                  left: 0,
                  right: -0,
                  zIndex: 1,
                  p: 0,
                  m: 0,
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  "*:hover": {
                    backgroundColor: "#EEEEEE",
                  },
                }}
              >
                {availableCurrencies.map((currency) => (
                  <Suspense key={currency.currencyCode} fallback={<Skeleton/>}>
                    <ListItem
                      value={currency.currency}
                      onClick={() => handleCurrencySelect(currency.currency)}
                      sx={{
                        py: 1,
                        px: 2,
                        fontSize: "1rem",
                        backgroundColor:
                          store.state.currentCurrency === currency.currency
                            ? "#EEEEEE"
                            : "#fff",
                      }}
                    >
                      {currency.currency} {currency.currencyCode}
                    </ListItem>
                  </Suspense>
                ))}
              </List>
            )}
          </IconButton>
          <IconButton
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Image src={cartIcon} alt="cart icon" />
            <Cart currency={store.state.currentCurrency} open={isCartOpen} />
          </IconButton>
          <IconButton size="large" edge="end" color="inherit"></IconButton>
        </Box>
      </Box>
      <CreateProduct
        onClose={() => {
          setIsCreateProductOpen(false);
        }}
        isOpen={isCreateProductOpen}
      />
    </AppBar>
  );
};

export default Header;
