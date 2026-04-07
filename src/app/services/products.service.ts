import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient)
  private apiUrl= 'http://localhost:3000/products';

  getAll(): Promise<IProduct[]> {
    return lastValueFrom(this.httpClient.get<IProduct[]>(`${this.apiUrl}`));
  }
  getById(id: string | undefined): Promise<IProduct>  {
    return lastValueFrom(this.httpClient.get<IProduct>(`${this.apiUrl}/${id}`));
  }

  addProduct(product: IProduct) {
    return lastValueFrom(this.httpClient.post<IProduct>(this.apiUrl, product));
  }

  deleteProduct(id: string | number) {
    return lastValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`));
  }

}

