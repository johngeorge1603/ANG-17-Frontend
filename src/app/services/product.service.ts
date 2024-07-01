import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams, Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  // Getting products from the API with pagination parameters
  getProducts(url: string, params: PaginationParams): Observable<Products> {
    return this.apiService.get<Products>(url, {
      params,
      responseType: 'json',
    });
  };

  // Adding a new product to the API
  addProduct(url: string, body: Product): Observable<any> {
    return this.apiService.post<any>(url, body, {});
  }

  // Editing an existing product in the API
  editProduct(url: string, body: Product): Observable<any> {
    return this.apiService.put<any>(url, body, {});
  }

  // Deleting a product from the API
  deleteProduct(url: string): Observable<any> {
    return this.apiService.delete<any>(url, {});
  }
}
