import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';


// Se ejecuta automáticamente antes de cada petición HTTP de la app.
// Si hay un token guardado, lo añade a la cabecera Authorization
// para que el back pueda validar la sesión en rutas protegidas.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  // Si hay token, clonamos la petición añadiéndole la cabecera Authorization (las peticiones son inmutables, no se pueden modificar directamente).
  // Si no hay token (por ejemplo antes de hacer login), usamos la petición original sin tocarla.
  const request = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  //si el backend responde 401, cerramos sesión y llevamos al login
  return next(request).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/auth/login')) {
        authService.logout()
        toast.error("Tu sesión ha caducado. Inicia sesión de nuevo.");
        router.navigate(['/login'])
      }
      return throwError(() => error);
    })
  )
};
