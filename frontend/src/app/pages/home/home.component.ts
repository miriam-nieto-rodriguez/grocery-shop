import { Component, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/iproduct.interface';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../interfaces/icategory.interface';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productsServices = inject(ProductsService);
  categoriesServices = inject(CategoriesService);
  arrProducts = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(8);
  filterText = signal<string>('');
  totalItems = signal<number>(0);
  selectedCategoryId = signal<number | undefined>(undefined);


  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  })

  ngOnInit() {
    this.cargarProductos()
    this.cargarCategorias()
  }

  async cargarProductos() {
    try {
      // pedimos al backend la página actual, con el límite de items y el texto de búsqueda
      const response = await this.productsServices.getAll(this.currentPage(), this.itemsPerPage(), this.filterText(), this.selectedCategoryId());
      this.arrProducts.set(response.products); // ya viene solo la página actual, no hace falta paginar aquí
      this.totalItems.set(response.total) // total real de la BBDD, usado para calcular totalPages
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  private categoryOrder = [ 'Frutas', 'Verduras', 'Hierbas', 'Especiales']

  async cargarCategorias() {
    try {
      const response = await this.categoriesServices.getAll()
      const ordenadas = response.categories.sort((a, b) =>
        this.categoryOrder.indexOf(a.name) - this.categoryOrder.indexOf(b.name)
      )

      this.categories.set(ordenadas);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterText.set(input.value)
    this.currentPage.set(1) // volvemos a la página 1, porque una nueva búsqueda puede tener menos resultados que la página actual
    this.cargarProductos() // la búsqueda la hace el backend, así que hay que volver a pedir los datos manualmente
  }

  filtrarPorCategoria(categoryId: number) {
    if (this.selectedCategoryId() === categoryId) { 
      this.selectedCategoryId.set(undefined); // si ya estaba seleccionada esta categoria, la deseleccionamos (clic de nuevo = quitar el filtro)
    } else {
      this.selectedCategoryId.set(categoryId) // si es una categoría distinta (o ninguna estaba seleccionada), la seleccionamos
    }

    this.currentPage.set(1) // volvemos a la página 1, porque el nuevo filtro puede tener menos resultados que la página actual
    this.cargarProductos()// pedimos al backend los productos ya filtrados por esta categoría 
  }

  private categoryIcons: Record<string, { normal: string, white: string }> = {
    'Frutas': { normal: 'apple.svg', white: 'apple-white.svg'},
    'Verduras': { normal: 'carrot.svg', white: 'carrot-white.svg'},
    'Hierbas': { normal: 'leaf.svg', white: 'leaf-white.svg'},
    'Especiales': { normal: 'star.svg', white: 'star-white.svg'}
  }

  getCategoryIcon(categoryName: string) {
    return this.categoryIcons[categoryName]; // undefined si no hay coincidencia, el HTML decidirá si mostrar algo o no
  }

  cambiarPagina(nuevaPagina: number) {
    this.currentPage.set(nuevaPagina);
    this.cargarProductos(); 
  }

}
