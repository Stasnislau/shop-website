import React, {
  useState,
  useEffect,
  Suspense,
  startTransition,
  useContext,
} from "react";
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
import { observer } from "mobx-react-lite";
import AddIcon from "@mui/icons-material/Add";
import shopLogo from "../../public/shop-logo.svg";
import cartIcon from "../../public/cart-icon.svg";
import Cart from "./cart";
import CreateProduct from "./createProduct";
import { Context } from "@/pages/_app";
import { useRouter } from "next/router";
import { Prisma, currencies } from "@prisma/client";
import { start } from "repl";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const Header = observer(() => {
  const navigate = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [availableCurrencies, setAvailableCurrencies] = useState(
    [] as currencies[]
  );
  const store = useContext(Context);
  const handleCurrencySelect = (currency: string) => {
    store.setCurrentCurrency(currency);
    setIsCurrencyMenuOpen(false);
  };
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "men" | "women" | "kids"
  ) => {
    store.setCurrentCategory(newValue);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("cart-open", isCartOpen);
  }, [isCartOpen]);
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        store.setIsLoading(true);
        const response = (await fetch(API_URL + "/currency/all"));
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.message);
        }
        setAvailableCurrencies(data);
      } catch (error: any) {
        store.displayError(error.message);
      } finally {
        store.setIsLoading(false);
      }
    };
    startTransition(() => {
      fetchCurrencies();
    });
  }, [store.state.currentCurrency, store]);
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "none", paddingBottom: "1%" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Tabs
          value={store.state.currentCategory}
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
          <Tab value={"men"} label="Men" />
          <Tab value={"women"} label="Women" />
          <Tab value={"kids"} label="Kids" />
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
            {availableCurrencies.length > 0 && (
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
                {isCurrencyMenuOpen &&
                  availableCurrencies.map((currency) => (
                    <Suspense
                      key={currency.currencyCode}
                      fallback={<Skeleton />}
                    >
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
});

export default Header;
