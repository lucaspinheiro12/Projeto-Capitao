import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Order, Sale } from '../models/modelos';
import { api } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInsertDeleteService {
  private baseSaleUrl:string = '';
  private baseOrderUrl:string = ''

  constructor( private http:HttpClient) { 
    this.baseSaleUrl = api.vendas;
    this.baseOrderUrl = api.order;
  }

  addSale(newSale: Sale| any): Observable<Sale > {
    console.log(newSale);
    console.log(this.baseSaleUrl);
    return this.http.post<Sale| any>(`${this.baseSaleUrl}`, newSale).pipe(
       catchError(error => {
        console.log("aqui")
          console.error('Erro na requisição HTTP:', error);
          throw error; // Lança o erro novamente para que outros possam tratá-lo
       })
    );
 }
}
