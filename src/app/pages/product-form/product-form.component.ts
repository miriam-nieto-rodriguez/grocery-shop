import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct.interface';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm: FormGroup;
  productsService = inject(ProductsService)
  router = inject(Router)
  id = input<string>()
  title: string = 'Agregar'
  product = signal<IProduct | undefined>(undefined)


  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01)
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ])

    }, [])
  }

  checkControl(controlName: string, errorName: string): boolean {
    return !!(this.productForm.get(controlName)?.hasError(errorName) && this.productForm.get(controlName)?.touched);
  }

  async ngOnInit() {
    if (this.id()) {
      this.title = "Actualizar"
      this.product.set(await this.productsService.getById(this.id()))

      this.productForm.patchValue({
        id: this.product()?.id,
        name: this.product()?.name,
        price: this.product()?.price,
        description: this.product()?.description,
        category: this.product()?.category,
        imageUrl: this.product()?.imageUrl
      })

    }
  }

  async getDataForm() {
    if (this.id()) {
      try {
        console.log(this.productForm.value)
        const response = await this.productsService.updateProduct(this.productForm.value, this.id());

        if (response.id) {
          toast.success(`Producto ${response.name} editado exitosamente `);
          this.router.navigate(['/home'])
        }
      } catch (error) {
        toast.error('Error al actualizar el producto');
      }
    } else {
      try {
        let response = await this.productsService.addProduct(this.productForm.value)
        if (response) {
          toast.success('Producto agregado exitosamente');
          this.productForm.reset();
          this.router.navigate(['/home'])
        }
      } catch(error) {
        toast.error ("Error al agregar el producto")
      }
    }

  }

}



