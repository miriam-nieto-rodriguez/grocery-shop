import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  id = input<string>()
  cartServices = inject(CartService)
  product = signal<IProduct | null>(null)
  productsServices = inject(ProductsService)

  ngOnInit () {
    this.cargarContenido()
  }

  async cargarContenido (){
    try {
      const id = this.id();
      if (id !== undefined) {
        this.product.set(await this.productsServices.getById(id));
      }

    } catch (error) {
      console.error('Error al cargar el producto:', error);

    }
  }
}
