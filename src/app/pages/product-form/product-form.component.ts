import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

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


  constructor(){
    this.productForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      price: new FormControl('',[
        Validators.required,
        Validators.min(0.01)    
      ]),
      description: new FormControl('',[
        Validators.required,
      ]),
      category: new FormControl('',[
        Validators.required,
      ]),
      imageUrl: new FormControl('',[
        Validators.required,
        Validators.pattern(/^https?:\/\//)
      ])

    }, [])
  }

  checkControl(controlName: string, errorName: string): boolean  {
    return !!( this.productForm.get(controlName)?.hasError(errorName) && this.productForm.get(controlName)?.touched);
  }

  async getDataForm(){
    if (this.productForm.valid) {
      const nuevoProducto = this.productForm.value;

      console.log ('Producto creado:', nuevoProducto);

      try{
        const response = await this.productsService.addProduct(nuevoProducto);

        if(response) {
          toast.success('Producto agregado exitosamente');
          this.productForm.reset();
          this.router.navigate(['/home'])
        }
      }catch(error){
        toast.error('Error al agregar el producto');
      }
    }

  }

}
