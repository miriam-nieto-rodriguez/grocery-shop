import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { IRegisterData } from '../../interfaces/iuser.interface';

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
    city: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
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
    const { name, surname, phone, address, city, country, code_postal, email, password } = this.registerForm.value;
    if (this.registerForm.invalid) {
      toast.error('Por favor, rellena todos los campos correctamente.');
      return
    }

    try {
      await this.authService.register({ name, surname, phone, address, city, country, code_postal, email, password } as IRegisterData);
      toast.success('Cuenta creada correctamente');
      this.router.navigate(['/home'])
    } catch (error) {
      console.error('Error al registrar la cuenta: ', error)
      toast.error('No se pudo crear la cuenta');
    }

  }

}

