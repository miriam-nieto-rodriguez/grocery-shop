import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  myProduct = input<IProduct>()
  cartService = inject(CartService)

  addToCart() {
    this.cartService.addToCart(this.myProduct()!);
  }

}
