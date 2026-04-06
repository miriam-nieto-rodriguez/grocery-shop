import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/iproduct.interface';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productsServices = inject(ProductsService);
  cartService = inject(CartService)
  arrProducts = signal<IProduct[]>([])

  ngOnInit (){
    this.cargarContenido()
  }

  async cargarContenido() {
    try {
      const response: IProduct[] = await this.productsServices.getAll();
      this.arrProducts.set(response);
    }catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

}
