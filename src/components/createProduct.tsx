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
} from "@mui/material";
import { ProductToCreate, Price, fileObject } from "../types";
import CancelIcon from "@mui/icons-material/Cancel";
import { API_URL } from "./header";
import { Context } from "@/pages/_app";
import { currencies } from "@prisma/client";
import UploadZone from "../components/uploadZone";
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
    price: {
      currency: "",
      amount: 0,
    } as Price,
    colors: [] as string[],
    gallery: [] as fileObject[],
    sizes: [] as string[],
    category: "men" as "men" | "women" | "kids",
  };

  const store = useContext(Context);
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        store.setIsLoading(true);
        const response = await fetch(API_URL + "/currency/all", {
          method: "GET",
        });
        const data = await response.json();
        
        if (response.status !== 200) {
          throw new Error(data.message);
        }
        const newArray = [] as currencyState[];
        data.map((item: currencies) =>
          newArray.push({
            symbol: item.currency,
            taken: false,
          })
        );
        setPossibleCurrencies(newArray);
      } catch (error: any) {
        console.log(error);
        store.displayError(error.message);
      } finally {
        store.setIsLoading(false);
      }
    };
    startTransition(() => {
      fetchCurrencies();
    });
  }, [store.state.currentCurrency, store]);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup.object({
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
      amount: yup
        .number()
        .min(0.01, "Price must be greater than 0")
        .required("Price is required"),
    }),
    gallery: yup
      .array()
      .of(yup.string())
      .min(1, "At least one image is required")
      .required("At least one image is required"),
    colors: yup
      .array()
      .of(yup.string())
      .min(1, "At least one color is required")
      .required("At least one color is required"),
    sizes: yup
      .array()
      .of(yup.string())
      .min(1, "At least one size is required")
      .required("At least one size is required"),
    category: yup
      .string()
      .oneOf(["men", "women", "kids"])
      .required("Category is required"),
  });
  const onSubmit = async (values: ProductToCreate) => {
    try {
      store.setIsBeingSubmitted(true);
      const response = await fetch(API_URL + "/products/create", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        store.displaySuccess("Product created successfully");
        formik.resetForm();
        onClose();
      }
    } catch (error) {
      store.displayError((error as string) || "Something went wrong");
    } finally {
      store.setIsBeingSubmitted(false);
    }
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
              <FormControl fullWidth>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  name="name"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <Box sx={{ color: "red" }}>{formik.errors.name}</Box>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Description"
                  name="description"
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description ? (
                  <Box sx={{ color: "red" }}>{formik.errors.description}</Box>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Category"
                  name="category"
                  onBlur={formik.handleBlur}
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
                {formik.touched.category && formik.errors.category ? (
                  <Box sx={{ color: "red" }}>{formik.errors.category}</Box>
                ) : null}
              </FormControl>
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
                  onBlur={formik.handleBlur}
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
                {formik.touched.colors && formik.errors.colors ? (
                  <Box sx={{ color: "red" }}>{formik.errors.colors}</Box>
                ) : null}
              </FormControl>

              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                }}
              >
                <InputLabel>Sizes</InputLabel>
                <Select
                  name="sizes[]"
                  multiple
                  onBlur={formik.handleBlur}
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
                {formik.touched.sizes && formik.errors.sizes ? (
                  <Box sx={{ color: "red" }}>{formik.errors.sizes}</Box>
                ) : null}
              </FormControl>

              <FormControl
                sx={{
                  width: "100%",
                  marginBottom: 2,
                }}
              >
                <InputLabel>Price Currency</InputLabel>
                <Select
                  name="price.currency"
                  onBlur={formik.handleBlur}
                  value={formik.values.price.currency}
                  onChange={formik.handleChange}
                  label="Price Currency "
                  fullWidth
                >
                  {possibleCurrencies.map((c, i) => (
                    <MenuItem key={i} value={c.symbol}>
                      {c.symbol}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.price?.currency &&
                formik.errors.price?.currency ? (
                  <Box sx={{ color: "red" }}>
                    {formik.errors.price.currency}
                  </Box>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Amount"
                  name="price.amount"
                  onBlur={formik.handleBlur}
                  fullWidth
                  type="number"
                  value={formik.values.price.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 10) {
                      e.target.value = value.slice(0, 10);
                    }
                    if (value.length === 0) {
                      e.target.value = "0";
                    }
                    if (
                      value.length > 1 &&
                      value[0] === "0" &&
                      value[1] !== "."
                    ) {
                      e.target.value = value.slice(1);
                    }
                    if (value.includes(".")) {
                      const split = value.split(".");
                      if (split[1].length > 2) {
                        e.target.value = split[0] + "." + split[1].slice(0, 2);
                      }
                    }
                    formik.handleChange(e);
                  }}
                  inputProps={{
                    min: 0,
                    step: "any",
                  }}
                />
                {formik.touched.price?.amount && formik.errors.price?.amount ? (
                  <Box sx={{ color: "red" }}>{formik.errors.price.amount}</Box>
                ) : null}
                <FormControl
                  sx={{
                    width: "100%",
                    minHeight: "80px",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  <UploadZone
                    onChange={(value: string[]) => {
                      formik.setFieldValue("gallery", value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.gallery && formik.errors.gallery ? (
                    <Box sx={{ color: "red" }}>
                      {formik.errors.gallery as String}
                    </Box>
                  ) : null}
                </FormControl>
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
