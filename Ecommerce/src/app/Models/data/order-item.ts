import { Product } from "./product";

export interface OrderItem {
    orderID?:number;
    productID?:number;
    quantity?:number;
    product?:Product;
}
