import { Component, OnInit } from '@angular/core';
import { Command, Order, Sale } from 'src/app/models/modelos';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
import { ApiService } from 'src/app/services/api.serviceComands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{
  constructor(private apiService: ApiService , private apiInsertDelete: ApiInsertDeleteService) {}

  
  //parte dos peditos . tenho que refatorar.
  orders : Order[] =[];
  command:Command |any;
  private sale!:Sale;

  ngOnInit() {
    this.apiService.commandSelecionado$.subscribe(command => {
      this.command = command;

      //verifica se a commanda nao esta vazia (parte da command)
      if(command === ''){
        this.commandEncontrado = '';
        this.valorInput = '';
      }
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
    if (this.command != '') {
       this.sale = {
          id: 0,
          order: this.orders,
          vendor: 'Angular',
          commands: this.command
       }
       this.apiInsertDelete.addSale(this.sale).subscribe();
       Swal.fire({
        title: 'Sucesso!',
        text: 'venda realizada para o cliente: ' + this.command.client.name,
        icon: 'success',
      });
       // Limpar os produtos selecionados ou tomar outra ação necessária
       this.apiService.atualizarProdutos([]);
       this.apiService.atualizaInputCommand ('');
    } else {
      Swal.fire({
        title: 'error!',
        text: 'comanda não encontrada' ,
        icon: 'error',
      });
    }
 }

//Parte comanda devo ajutar e refatorar.
valorInput: number|any;
 commandEncontrado: Command | any; // Adicione essa propriedade para armazenar o cliente encontrado

  
 async pegaCommand(id:number) {
   console.log(id)
   try {
     this.commandEncontrado = await this.apiService.getCommandById(id).toPromise();
   } catch (error) {
     console.error('Erro ao buscar comanda:', error);
   }
 }
}

