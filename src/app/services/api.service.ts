import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // Generic GET request
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options);
  }
  // <T> implies that it can handle data of any type
  // options can include parameters, headers, etc.

  // Generic PUT request
  put<T>(url: string, body: T, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options);
  }

  // Generic POST request
  post<T>(url: string, body: T, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options);
  }

  // Generic DELETE request
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }
}
