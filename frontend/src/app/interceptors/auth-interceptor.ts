import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


// Se ejecuta automáticamente antes de cada petición HTTP de la app.
// Si hay un token guardado, lo añade a la cabecera Authorization
// para que el back pueda validar la sesión en rutas protegidas.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Las peticiones HTTP son inmutables: hay que clonarlas
    // para poder añadirles una cabecera nueva
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }

    });
    return next(clonedRequest);
  }
  
  // Si no hay token (p. ej. antes de hacer login), la petición
  // sigue su camino sin modificar
  return next(req);
};
