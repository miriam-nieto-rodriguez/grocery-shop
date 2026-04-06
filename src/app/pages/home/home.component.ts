import { Component, computed, inject, signal } from '@angular/core';
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
  currentPage = signal<number>(1)
  itemsPerPage = signal<number>(8)

  productsPaginados = computed(() =>{
    const inicio = (this.currentPage() -1) * this.itemsPerPage(); 
    const fin = inicio + this.itemsPerPage();
    return this.arrProducts().slice(inicio, fin);
  })

  totalPages = computed(() => {
    return Math.ceil(this.arrProducts().length / this.itemsPerPage());
  })

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
