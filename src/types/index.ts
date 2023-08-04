export interface Product {
  id: number;
  name: string;
  description: string;
  prices: Price[];
  gallery: string[];
  sizes: string[];
  colors: string[];
  category: "men" | "women" | "kids";
}

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
