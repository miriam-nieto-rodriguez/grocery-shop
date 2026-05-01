import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartServices = inject(CartService);
  carrito = this.cartServices.carrito;
  router = inject(Router)


  realizarPago() {
    this.router.navigate(['/checkout']);
  }


}
