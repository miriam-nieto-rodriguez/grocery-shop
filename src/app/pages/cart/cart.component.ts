import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartServices = inject(CartService);
  carrito = this.cartServices.carrito;

  getTotal() {
    return this.carrito().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }


}
