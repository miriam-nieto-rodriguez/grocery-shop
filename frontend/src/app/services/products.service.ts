import { inject, Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/products`;

  getAll(page: number = 1, limit: number = 8, search: string = "", category?: number) {
    const params: any = { page, limit, search };
    if (category !== undefined) {
      params.category = category;
    }
    return lastValueFrom
      (this.httpClient.get<{ total: number, products: IProduct[] }>(this.apiUrl, {
        params
      })
      );
  }

  getById(id: string | undefined): Promise<IProduct> {
    return lastValueFrom(this.httpClient.get<IProduct>(`${this.apiUrl}/${id}`));
  }

  addProduct(product: IProduct) {
    return lastValueFrom(this.httpClient.post<IProduct>(this.apiUrl, product));
  }

  deleteProduct(id: string | number) {
    return lastValueFrom(this.httpClient.delete(`${this.apiUrl}/${id}`));
  }

  updateProduct(product: IProduct, id: string | undefined) {
    return lastValueFrom(this.httpClient.put<IProduct>(`${this.apiUrl}/${id}`, product))
  }

}

