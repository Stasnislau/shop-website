import { useEffect, useState, useContext, startTransition } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  OutlinedInput,
  Box,
  InputLabel,
  FormControl,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { ProductToCreate, Price } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";
import { API_URL } from "./header";
import { Context } from "@/pages/_app";
import { currencies } from "@prisma/client";
import  UploadZone from "../components/uploadZone"
interface CreateProductProps {
  onClose: () => void;
  isOpen: boolean;
}

interface currencyState {
  symbol: string;
  taken: boolean;
}
const CreateProduct = ({ onClose, isOpen }: CreateProductProps) => {
  const possibleCategories = ["men", "women", "kids"];

  const [possibleCurrencies, setPossibleCurrencies] = useState<currencyState[]>(
    []
  );
  const possibleSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const possibleColors = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "white",
  ];
  const initialValues = {
    name: "",
    description: "",
    prices: [
      {
        currency: "",
        amount: 0,
      },
    ] as Price[],
    colors: [] as string[],
    gallery: [] as string[],
    sizes: [] as string[],
    category: "men" as "men" | "women" | "kids",
  };
  const store = useContext(Context);
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        store.setIsLoading(true);
        const response = await fetch(API_URL + "/currency/all");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = (await response.json()) as currencies[];
        const newArray = [] as currencyState[];
        data.map((item) =>
          newArray.push({
            symbol: item.currency,
            taken: false,
          })
        );
        setPossibleCurrencies(newArray);
      } catch (error) {
        console.log(error);
        store.displayError((error as string) || "Something went wrong");
      } finally {
        store.setIsLoading(false);
      }
    };
    startTransition(() => {
      console.log("fetching currencies");
      fetchCurrencies();
    });
  }, [store.state.currentCurrency, store]);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    prices: yup.array().of(
      yup.object({
        currency: yup
          .string()
          .required("Currency is required")
          .test("is-taken", "Currency is already taken", (value) => {
            const currency = possibleCurrencies.find((c) => c.symbol === value);
            if (currency) {
              return !currency.taken;
            }
            return false;
          }),
        amount: yup.number().required("Amount is required"),
      })
    ),
    gallery: yup.array().of(yup.string()),
    sizes: yup.array().of(yup.string()),
    category: yup
      .string()
      .oneOf(["men", "women", "kids"])
      .required("Category is required"),
  });
  const onSubmit = (values: ProductToCreate) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      {isOpen ? (
        <Dialog open onClose={onClose}>
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Create Product</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                name="name"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <TextField
                margin="dense"
                label="Category"
                name="category"
                select
                fullWidth
                value={formik.values.category}
                onChange={formik.handleChange}
                sx={{
                  marginBottom: 2,
                }}
              >
                {possibleCategories.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                }}
              >
                <InputLabel>Colors</InputLabel>
                <Select
                  name="colors"
                  multiple
                  fullWidth
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                        overflowY: "auto",
                      },
                    },
                  }}
                  value={formik.values.colors}
                  onChange={(e) => {
                    formik.setFieldValue("colors", e.target.value);
                  }}
                  input={<OutlinedInput label="Colors" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() => {
                            formik.setFieldValue(
                              "colors",
                              formik.values.colors.filter((c) => c !== value)
                            );
                          }}
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(
                                event: React.MouseEvent<
                                  SVGSVGElement,
                                  MouseEvent
                                >
                              ) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {possibleColors.map((c, i) => (
                    <MenuItem
                      key={i}
                      value={c}
                      sx={{
                        justifyContent: "space-between",
                        overflowY: "auto",
                      }}
                    >
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                }}
              >
                <InputLabel>Sizes</InputLabel>
                <Select
                  name="sizes"
                  multiple
                  fullWidth
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                        overflowY: "auto",
                      },
                    },
                  }}
                  value={formik.values.sizes}
                  onChange={(e) => {
                    formik.setFieldValue("sizes", e.target.value);
                  }}
                  input={<OutlinedInput label="Sizes" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() => {
                            formik.setFieldValue(
                              "sizes",
                              formik.values.sizes.filter((c) => c !== value)
                            );
                          }}
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(
                                event: React.MouseEvent<
                                  SVGSVGElement,
                                  MouseEvent
                                >
                              ) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {possibleSizes.map((c, i) => (
                    <MenuItem
                      key={i}
                      value={c}
                      sx={{
                        justifyContent: "space-between",
                        overflowY: "auto",
                      }}
                    >
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                }}
              >
                <InputLabel>Price Currency</InputLabel>
                <Select label="Price Currency " fullWidth>
                  {possibleCurrencies.map((c, i) => (
                    <MenuItem key={i} value={c.symbol}>
                      {c.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                label="Amount"
                fullWidth
                value={formik.values.prices[0].amount}
                onChange={formik.handleChange}
              />
              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                <UploadZone/>
              </FormControl>
            </DialogContent>

            <DialogActions
              sx={{
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={onClose}
                sx={{
                  color: "red",
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </form>
        </Dialog>
      ) : null}
    </>
  );
};

export default CreateProduct;
