import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.serviceComands';
import { Command, Order, Product, Sale } from 'src/app/models/modelos';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
@Component({
  selector: 'app-box-order',
  templateUrl: './box-order.component.html',
  styleUrls: ['./box-order.component.css']
})
export class BoxOrderComponent implements OnInit{
  constructor(private apiService: ApiService , private apiInsertDelete: ApiInsertDeleteService) {}

  orders : Order[] =[];
  command:Command |any;
  private sale!:Sale;

  ngOnInit() {
    this.apiService.commandSelecionado$.subscribe(command => {
      this.command = command;
    })
    this.apiService.produtosSelecionados$.subscribe(produtos => {
      this.orders = produtos;
    });
    this.apiService.getSales().subscribe(sale => {sale})
  }
   
  removeOrder(produto: Order) {
    const index = this.orders.findIndex(order => order.id === produto.id);
    if (index !== -1) {
      const updatedOrders = [...this.orders.slice(0, index), ...this.orders.slice(index + 1)];
      this.orders = updatedOrders;
      this.apiService.atualizarProdutos([...updatedOrders]);
    }
  }
  calcularTotal(): number {
    const result = this.orders.reduce((total, order) => total + order.price * order.quantity, 0) + this.calcularTaxa();
    return +result.toFixed(2) ;
  }
  calcularTaxa(): number {
    const taxa = this.orders.reduce(
      (total, order) => total + order.price * 0.1 * order.quantity,
      0
    );
    return +taxa.toFixed(2);
  }

  finalizarPedido(): void {
    if (this.command) {
       this.sale = {
          id: 0,
          order: this.orders,
          vendor: 'Angular',
          commands: this.command
       }
       this.apiInsertDelete.addSale(this.sale).subscribe(res => console.log("respsta", res));
       // Limpar os produtos selecionados ou tomar outra ação necessária
       this.apiService.atualizarProdutos([]);
       this.apiService.atualizaInputCommand ('');
       console.log(this.command)
    } else {
       console.log('Cliente não encontrado');
    }
 }
}
    

