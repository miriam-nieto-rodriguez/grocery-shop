import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartServices = inject(CartService);
  router = inject(Router)
  carrito = this.cartServices.carrito

  realizarPago() {
    this.router.navigate(['/checkout'])
    
  }


}
