import { product} from "@prisma/client";

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
  gallery: string[]
}

export interface fileObject extends File {
  preview: string;
}
