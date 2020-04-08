import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Products } from '../models/products';

const db_path = "http://localhost:3000/products";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private products: Products[];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T){
    return(error:any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    }
  }
  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(db_path).pipe(
      tap(_=> console.log('fetched products')),
      catchError(this.handleError<Products[]>('getProducts', []))
    );
  }
  getProductById(id: string): Observable<Products> {
    const url = `${db_path}/${id}`;
    return this.http.get<Products>(url).pipe(
      tap(_ => console.log(`fetched profiles id=${id}`)),
      catchError(this.handleError<Products>(`Product Details: id=${id}`))
    );
  }
  updateImageUrl(product){
    product.image_url = "../../assets/images/placeholder.png";
    console.log(product.image_url);
  }
  
}
