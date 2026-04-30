import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { toast } from 'ngx-sonner';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  id = input<string>()
  cartServices = inject(CartService)
  product = signal<IProduct | null>(null)
  productsServices = inject(ProductsService)
  cantidad = signal<number>(1)
 

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

  cambiarCantidad(valor: number){
    this.cantidad.update(valorActual=> Math.max(1, valorActual + valor))
  }

  agregarAlCarrito(){
    const product = this.product()

    if (product) {
      for (let i=0; i < this.cantidad(); i++) {
        this.cartServices.addToCart(product)
      }

      toast.success(`Has añadido al carrito ${this.cantidad()} unidad(es) de ${product.name}`)

      this.cantidad.set(1) // limpiamos 
    }

  }
}
