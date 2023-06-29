import { ProductDTO } from "../../products/dto";
export interface CartDTO {
    id : number;
    cartItems : CartItemDTO[];
}

export interface CartItemDTO {
    id : number;
    productId : number;
    quantity : number;
    cartId : number;
}

