import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { toast } from 'ngx-sonner';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartServices = inject(CartService);
  orderServices = inject(OrdersService);
  authServices = inject(AuthService);
  router = inject(Router);

  loading = signal(false);
  editingStep = signal<number>(0);
  selectedPaymentMethod = signal<string>('card');

  userForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
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

  });

  async ngOnInit() {
    await this.loadUserData();
  }

  async loadUserData() {
    try {
      const response = await this.authServices.getProfile();
      const user = response.user;

      if (user) {
        // pathValue rellena de forma transparente los inputs del formulario userForm con la info del perfil guardada en la bbdd
        this.userForm.patchValue({
          nombre: user.name || '',
          email: user.email || '',
          telefono: user.phone || '',
          direccion: user.address || '',
          cp: user.code_postal || '',
          ciudad: user.city || ''
        });

        //actualiza las validaciones tras autocompletar
        this.userForm.updateValueAndValidity();
      }

    } catch (error) {
      console.error('Error al cargar datos del usuario:', error)
    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  toggleEditStep(step: number) {
    // esta funcion funciona como un interruptor entre el modo de resumen y el modo de edición
    if (this.editingStep() === step) { 
      if (step === 1 && this.userForm.invalid) { 
        this.userForm.markAllAsTouched();
        toast.error('Por favor rellena todos los datos correctamente.')
        return;
      }
      this.editingStep.set(0);
    } else {
      this.editingStep.set(step)
    }
  }

  setPaymentMethod(method: string) {
    this.selectedPaymentMethod.set(method);
  }


  async confirmOrder() {

    // limpieza de espacios en blanco
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    })

    // validación final antes de enviar
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); //marca los campos vacios en rojo
      toast.error('Por favor, rellena todos los campos correctamente.');
      return;
    }

    //activa estado de carga (el boton pasa a procesando...)
    this.loading.set(true);

    // mapear los items del carrito
    const itemsToOrder = this.cartServices.carrito().map(item => ({
      productId: item.product.id,
      amount: item.quantity
    }));

    try {

      // envia la petición al backend
      await this.orderServices.createOrder(itemsToOrder);

      // si esta bien 
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
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      toast.error('Ocurrió un error al procesar tu compra. Inténtalo de nuevo.');
    } finally {

      // desactiva el modo de carga
      this.loading.set(false)
    }

  }




}


