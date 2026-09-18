import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../interfaces/iorder.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/orders';

  getAll(): Promise<IOrder[]> {
    return lastValueFrom(this.httpClient.get<IOrder[]>(this.apiUrl))
  }

  createOrder(items: { productId: number, amount: number}[]): Promise<IOrder> {
    return lastValueFrom(this.httpClient.post<IOrder>(this.apiUrl, {items}))
  }




}
