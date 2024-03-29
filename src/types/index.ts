import { product } from "../../node_modules/prisma/prisma-client";

export interface ProductToCreate {
  name: string;
  description: string;
  price: Price;
  gallery: fileObject[];
  sizes: string[];
  colors: string[];
  category: "men" | "women" | "kids";
}

export interface Price {
  currency: string;
  amount: number;
}

export interface extendedProduct extends product {
  prices: Price[];
  gallery: string[];
}

export interface fileObject extends File {
  preview: string;
}

export interface CustomError {
  status: number;
  message?: string;
  name: string;
}

export interface CartItem {
  id: number;
  cartId: number;
  chosenSize: string;
  chosenColor: string;
  quantity: number;
  productId: number;
  product: extendedProduct;
}
export interface ExtendedCartItem {
  id: number;
  items: CartItem[];
}

export interface SmallCartItemProps {
  item: SmallItemProps;
  technicalProps: SmallTechnicalProps;
}

export interface SmallItemProps {
  id: number;
  quantity: number;
  image: string;
  name: string;
  description: string;
  price: Price;
  sizes: string[];
  colors: string[];
  chosenSize: string;
  chosenColor: string;
}

export interface SmallTechnicalProps {
  isLoading: boolean;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onSizeChange: (id: number, size: string) => void;
  onColorChange: (id: number, color: string) => void;
}

export interface Message {
  type: "error" | "success";
  message: string;
  id: number;
}
