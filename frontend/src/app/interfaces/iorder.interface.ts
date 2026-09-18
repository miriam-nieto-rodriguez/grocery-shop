
import { IProduct } from "./iproduct.interface";

export interface IOrder {
    id: number;
    status: string;
    date_order: string;
    total: string;
    address: string;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
    OrderItems: IOrderItem[];
}

export interface IOrderItem {
  id?: number;
  amount: number;
  unit_price: string;
  ProductId: number;
  OrderId?: number;
  Product?: Pick<IProduct, 'name' | 'image' | 'price'> ; // Solo los atributos que quiero que muestre y por tanto los unicos que pido en el backend
}
