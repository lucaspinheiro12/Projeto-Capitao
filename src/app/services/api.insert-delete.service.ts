import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import {  Sale,Cliente, Command, Product } from '../models/modelos';
import {  alertFail } from '../models/alerts';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ApiInsertDeleteService {
  private baseSaleUrl:string = '';
  private baseOrderUrl:string = '';
  private baseClientUrl:string = '';
  private baseCommandUrl:string = '';

  constructor( private http:HttpClient) { 
    this.baseSaleUrl = `http://localhost:8080/sales`;
    this.baseOrderUrl = `http://localhost:8080/order`;
    this.baseClientUrl = `http://localhost:8080/cliente`;
    this.baseCommandUrl = `http://localhost:8080/commands`;
  }

  deletSale(id:number):Observable<Sale>{
    return this.http.delete<Sale>(`${this.baseSaleUrl}/${id}`)
  }
  deleteOrderFromSale(saleId: number, orderId: number): Observable<Sale> {
    return this.http.put<Sale>(`${this.baseSaleUrl}/${saleId}/${orderId}`, {});
  }

  addSale(newSale: Sale| any): Observable<Sale > {
    return this.http.post<Sale| any>(`${this.baseSaleUrl}`, newSale).pipe(
       catchError(error => {
          console.error('Erro na requisição HTTP:', error);
          throw error; // Lança o erro novamente para que outros possam tratá-lo
       })
    );
 }
 
  addClient (client:Cliente){
    const cliente:Cliente = {
      cpf:client.cpf,
      name:client.name,
      contact:client.contact,
    }
    return this.http.post<Cliente>(`${this.baseClientUrl}`,client).pipe(
      catchError( error => {
        alertFail('Erro!', "Cadastro não realizado verifique os dados se estão corretos.")
      throw error;
      })
    )
  }
  
  addCommand(newClientCommand:Command | any){
   const cliente:Cliente = {
    cpf:newClientCommand.cpf,
    name:newClientCommand.name,
    contact:newClientCommand.contact
   }
   const command:Command = {
    client:cliente,
    entry: newClientCommand.entry,
    id: newClientCommand.idCommand,
   }

  return this.http.post<Command | any>(`${this.baseCommandUrl}`,command).pipe(
    catchError( error => {
      alertFail('Erro!', "Cadastro não realizado verifique os dados se estão corretos.")
      throw error;
    })
  )
 }
} 
