import { Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/iproduct.interface';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productsServices = inject(ProductsService);
  arrProducts = signal<IProduct[]>([])
  currentPage = signal<number>(1)
  itemsPerPage = signal<number>(8)
  filterText = signal<string>('')
  totalItems = signal<number>(0)


  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  })

  ngOnInit() {
    this.cargarContenido()
  }

  async cargarContenido() {
    try {
      // pedimos al backend la página actual, con el límite de items y el texto de búsqueda
      const response = await this.productsServices.getAll(this.currentPage(), this.itemsPerPage(), this.filterText());
      this.arrProducts.set(response.products); // ya viene solo la página actual, no hace falta paginar aquí
      this.totalItems.set(response.total) // total real de la BBDD, usado para calcular totalPages
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterText.set(input.value)
    this.currentPage.set(1) // volvemos a la página 1, porque una nueva búsqueda puede tener menos resultados que la página actual
    this.cargarContenido() // la búsqueda la hace el backend, así que hay que volver a pedir los datos manualmente
  }

  filtrarPorCategoria(categoria: string) {
    if (this.filterText() === categoria) {
      this.filterText.set('');
    } else {
      this.filterText.set(categoria)
    }

    this.currentPage.set(1)
  }

}
