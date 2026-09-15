import { ICategory } from "./icategory.interface";

export interface IProduct {
    id: number;
    name: string;
    Categories: ICategory[];
    price: number;
    image: string;
    description: string;
    stock: number;
}

export interface IProductItem {
    product: IProduct;
    quantity: number;
}

