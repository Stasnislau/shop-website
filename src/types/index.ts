import { product } from "@prisma/client";

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
  item: {
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
  };
  technicalProps: {
    isLoading: boolean;
    onRemove: (id: number) => void;
    onQuantityChange: (id: number, quantity: number) => void;
    onSizeChange: (id: number, size: string) => void;
    onColorChange: (id: number, color: string) => void;
  };
}
