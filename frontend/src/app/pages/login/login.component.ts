import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  async loginUser() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      toast.error('Por favor, rellena todos los campos correctamente.');
      return
    }
    try {
      await this.authService.login(email!, password!);

      toast.success('Te damos la bienvenida a Huerto Vivo')
      this.router.navigate(['/home'])

    } catch (error: any) {
      console.error('Error al iniciar sesión: ', error)
      toast.error('Email o contraseña incorrectos');

    }
  }


}
