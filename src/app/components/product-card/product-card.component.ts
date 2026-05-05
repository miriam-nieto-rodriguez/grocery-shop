import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  myProduct = input<IProduct>()
  cartService = inject(CartService)

  addToCart() {
    const producto = this.myProduct();

    if (producto) {
      this.cartService.addToCart(producto);

      toast.success(`Has añadido 1 unidad de ${producto.name}`, {
        description: 'Puedes ver tu selección en el carrito.',
        duration: 3000,
      });

    }

  }


}
