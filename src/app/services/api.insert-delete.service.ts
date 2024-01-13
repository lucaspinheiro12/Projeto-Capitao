import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import {  Sale,Cliente, Command } from '../models/modelos';
import { api } from './api.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ApiInsertDeleteService {
  private baseSaleUrl:string = '';
  private baseOrderUrl:string = '';
  private baseClientUrl:string = '';
  private baseCommandUrl:string = '';

  constructor( private http:HttpClient) { 
    this.baseSaleUrl = api.vendas;
    this.baseOrderUrl = api.order;
    this.baseClientUrl = api.clients;
    this.baseCommandUrl = api.command;
  }

  addSale(newSale: Sale| any): Observable<Sale > {
    return this.http.post<Sale| any>(`${this.baseSaleUrl}`, newSale).pipe(
       catchError(error => {
        console.log("aqui")
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
        console.error('Cliente não encontrado: ', error);
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
      console.log(error.error)
      Swal.fire({
        title: 'Erro!',
        text: error.error,
        icon: 'error',
      });
      console.error("deu error: ", error );
      throw error;
    })
  )
 }
} 
