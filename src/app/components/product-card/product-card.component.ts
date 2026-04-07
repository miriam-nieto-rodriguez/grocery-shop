import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  myProduct = input<IProduct>()
  cartService = inject(CartService)
  productsService = inject(ProductsService)
  @Output() productDeleted: EventEmitter<string | number> = new EventEmitter<string | number>();

  addToCart() {
    this.cartService.addToCart(this.myProduct()!);
  }



  async deleteProduct(id: string | number) {
  
    const result = await Swal.fire({
      title: `¿Seguro que quieres eliminar ${this.myProduct()?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await this.productsService.deleteProduct(id);
        toast.warning(`Producto ${this.myProduct()?.name} eliminado exitosamente`);
        this.productDeleted.emit(id);

      } catch (error) {
        toast.error('Error al eliminar el producto');
      }
    }

  }


}
