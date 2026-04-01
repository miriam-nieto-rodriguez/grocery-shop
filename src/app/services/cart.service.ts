import { Injectable, signal } from '@angular/core';
import { IProduct, IProductItem } from '../interfaces/iproduct.interface';
import { PRODUCTS } from '../products.db';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<IProduct[]>(PRODUCTS);
  carrito = signal<IProductItem[]>([]);

  getCart() {
    return this.cart();
  }

  addToCart(product: IProduct) {

    const item = this.carrito().find(item => item.product.id === product.id);

    if (item) {
      this.carrito.update(current => current.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)) // recorremos todos los item con map, si el id del producto coincide con el id del item que queremos agregar, entonces actualizamos la cantidad sumando 1, sino dejamos el item igual
    } else {
      this.carrito.update(current => [...current, { product, quantity: 1 }]); // si el producto no existe en el carrito, lo agregamos con una cantidad de 1
    }
  }

  decreaseQuantity(product: IProduct) {
    const item = this.carrito().find(item => item.product.id === product.id);

    if (item?.quantity === 1) {
      this.carrito.update(current => current.filter(i => i.product.id !== product.id)) // si la cantidad del producto es 0, lo eliminamos del carrito

    } else {
      this.carrito.update(current => current.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity - 1 } : i))
    }

  }
}
