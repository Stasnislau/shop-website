export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  prices: Price[];
  gallery: Buffer[];
  sizes: string[];
  colors: string[];
  category: "men" | "women" | "kids";
}

export interface Price {
  currency: string;
  amount: number;
}
