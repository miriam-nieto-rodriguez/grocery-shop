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

  getTotal() {
    return this.carrito().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  totalCarrito() {
    return this.cartServices.carrito().reduce((acc, item) => acc + item.product.price, 0);
  }

  async realizarPago() {
    await Swal.fire({
      title: '¡Pago realizado!',
      text: 'Tu pedido ha sido procesado con éxito. ¡Gracias por confiar en Fresh Market! 🥦',
      icon: 'success',
      confirmButtonText: 'Genial',
      confirmButtonColor: '#28a745',
      timer: 8000,
      timerProgressBar: true
    });

    this.cartServices.limpiarCarrito()

    this.router.navigate(['/home'])
  }


}
