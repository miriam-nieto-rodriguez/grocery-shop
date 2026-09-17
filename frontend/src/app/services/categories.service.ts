import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '../interfaces/icategory.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/categories';

  getAll(limit: number = 100) {
    return lastValueFrom(this.httpClient.get<{ total: number, categories: ICategory[] }>(this.apiUrl, {
      params: {limit}
    })
    );
  }
}
