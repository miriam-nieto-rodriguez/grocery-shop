import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { IRegisterData } from '../../interfaces/iuser.interface';
import { PROVINCES_CITIES } from '../../data/provinces.data';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null
  }

  return password === confirmPassword ? null : { passwordMisMatch: true }
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  provinces = Object.keys(PROVINCES_CITIES);

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9}$')
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    province: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    code_postal: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),

  },
    { validators: passwordsMatch }
  )
  async registerUser() {
    const { name, surname, phone, address, province, city, code_postal, email, password } = this.registerForm.value;
    if (this.registerForm.invalid) {
      toast.error('Por favor, rellena todos los campos correctamente.');
      return
    }

    try {
      await this.authService.register({ name, surname, phone, address,province, city, code_postal, email, password, country: 'España' } as IRegisterData);
      toast.success('Cuenta creada correctamente');
      this.router.navigate(['/home'])
    } catch (error) {
      console.error('Error al registrar la cuenta: ', error)
      toast.error('No se pudo crear la cuenta');
    }

  }

  getAvailableCities(): string[] {
    const choosenProvince = this.registerForm.get('province')?.value;
    // si hay alguna provincia elegida, devuelve el array de ciudades de esa provincia; si no hay ninguna elegida todavía, devuelve un array vacío (no hay ciudades que mostrar)
    return choosenProvince ? PROVINCES_CITIES[choosenProvince] : []; 

  }

  // Se ejecuta al cambiar el <select> de provincia.
 // Vacía la ciudad elegida, porque puede pertenecer a otra provincia y ya no sería válida.
  onProvinceChange() {
    this.registerForm.get('city')?.setValue('');
  }

}

