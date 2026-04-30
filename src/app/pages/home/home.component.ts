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

  productsFiltrados = computed(() => {
    const texto = this.filterText().toLowerCase();
    if(!texto) return this.arrProducts()

      return this.arrProducts().filter (p =>
        p.name.toLowerCase().includes(texto) ||
        p.category?.toLowerCase().includes(texto)
      )

    
  });

  productsPaginados = computed(() => {
    const inicio = (this.currentPage() - 1) * this.itemsPerPage();
    const fin = inicio + this.itemsPerPage();
    return this.productsFiltrados().slice(inicio, fin);
  })

  totalPages = computed(() => {
    return Math.ceil(this.productsFiltrados().length / this.itemsPerPage());
  })

  ngOnInit() {
    this.cargarContenido()
  }

  async cargarContenido() {
    try {
      const response: IProduct[] = await this.productsServices.getAll();

      this.arrProducts.set(response);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  eventDelete(id: string | number) {
    this.arrProducts.update(productos =>
      productos.filter(p => String(p.id) !== String(id))
    );

    const totalPaginas = Math.ceil(this.arrProducts().length / this.itemsPerPage());
    if (this.currentPage() > totalPaginas && totalPaginas > 0) {
      this.currentPage.set(totalPaginas);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterText.set(input.value)
    this.currentPage.set(1)
  }

  filtrarPorCategoria(categoria: string){
    if (this.filterText() === categoria){
      this.filterText.set('');
    }else {
      this.filterText.set(categoria)
    }



    this.currentPage.set(1)
  }

}
