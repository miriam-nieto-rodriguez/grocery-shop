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

  productsFiltrados = computed(() => {
    const texto = this.filterText().toLowerCase();
    if (!texto) return this.arrProducts()

    return this.arrProducts().filter(p =>
      p.name.toLowerCase().includes(texto) ||
      p.category?.toLowerCase().includes(texto)
    )
  });

  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  })

  ngOnInit() {
    this.cargarContenido()
  }

  async cargarContenido() {
    try {
      const response = await this.productsServices.getAll(this.currentPage(), this.itemsPerPage());
      this.arrProducts.set(response.products);
      this.totalItems.set(response.total)
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterText.set(input.value)
    this.currentPage.set(1)
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
