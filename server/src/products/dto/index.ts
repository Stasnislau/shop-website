export interface ProductDTO {
  id: number;
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
