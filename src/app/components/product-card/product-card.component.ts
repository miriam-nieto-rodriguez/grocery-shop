import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  myProduct = input<IProduct>()
  productsServices = inject(ProductsService)

  addProduct() {
    this.productsServices.addProduct(this.myProduct()!);
  }

}
