import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/iproduct.interface';
import { PRODUCTS } from '../products.db';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<IProduct[]>(PRODUCTS);

  addToCart(product: IProduct){
    this.cart.update(currentCart => [...currentCart, product]); 
  } 

  getCart() {
    return this.cart();
  }

}
