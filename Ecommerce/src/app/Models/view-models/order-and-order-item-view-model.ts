import { Status } from "../Shared/app-constants";
import { Customer } from "../data/customer";
import { OrderItem } from "../data/order-item";


export interface OrderAndOrderItemViewModel {
    orderID?:number;
    orderDate?:Date;
    deliveryDate?:Date;
    status?:Status;
    customerID?:number;
    orderItems?:OrderItem[];
    customer?:Customer;
}
