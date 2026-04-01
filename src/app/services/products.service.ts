import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct.interface';
import { PRODUCTS } from '../products.db';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: IProduct[] = PRODUCTS;

  getAll(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct) {
    this.products.push(product);
  }
}

