import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IRegisterData, IUser } from '../interfaces/iuser.interface';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  register(data: IRegisterData) {
    return lastValueFrom(this.httpClient.post<{ message: string, user: IUser }>(`${this.apiUrl}/register`, data));
  }

  async login(email: string, password: string) {
    const response = await lastValueFrom(
      this.httpClient.post<{ message: string, user: IUser, token: string }>(
        `${this.apiUrl}/login`,
        { email, password }
      )
    );
    localStorage.setItem(TOKEN_KEY, response.token);
    return response;
  }

  // Cerrar sesion con JWT solo hay que borrar el token del localStorage
  logout() { 
    localStorage.removeItem(TOKEN_KEY)
  }

  // Devuelve el token guardado en localStorage, o null si no existe
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null
  }


}
