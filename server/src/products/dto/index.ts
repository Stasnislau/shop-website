export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  prices: Price[];
  gallery: string[];
  sizes: string[];
  colors: string[];
  category: "men" | "women" | "kids";
}

export interface Price {
  currency: string;
  amount: number;
}
