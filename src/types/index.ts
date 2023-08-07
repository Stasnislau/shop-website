import { product, Image } from "@prisma/client";

export interface ProductToCreate {
  name: string;
  description: string;
  price: Price;
  gallery: Buffer[];
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
  gallery: string[]
}
