export interface IProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    description: string;
}

export interface IProductItem {
    product: IProduct;
    quantity: number;
}

