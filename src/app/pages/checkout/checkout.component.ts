import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { toast } from 'ngx-sonner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartServices = inject(CartService);
  router = inject(Router)

  cargando = signal(false)

  userForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9}$')
    ]),
    direccion: new FormControl('', [
      Validators.required
    ]),
    cp: new FormControl('', [
      Validators.required
    ]),
    ciudad: new FormControl('', [
      Validators.required
    ]),

  })

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }


  async confirmarPedido() {
    this.cargando.set(true);

    await new Promise(resolve => setTimeout(resolve, 4000))

    Swal.fire({
      title: '¡Pedido Realizado con Éxito!',
      text: 'Gracias por confiar en Huerto Vivo. Tu cosecha llegará pronto a casa.',
      icon: 'success',
      iconColor: 'var(--color-verde)',
      confirmButtonText: 'Volver a la tienda',
      confirmButtonColor: 'var(--color-naranja)',
      background: ' var(--blanco)',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartServices.limpiarCarrito();
        this.router.navigate(['/home']);
      }
    });
  }


}


