import { Component, OnInit } from '@angular/core';
import { alertFail, alertSuccess, aletTimerErro } from 'src/app/models/alerts';
import { Command, Order, Sale } from 'src/app/models/modelos';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
import { ApiService } from 'src/app/services/api.serviceComands';

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

  valorInput: number|any;
   commandEncontrado: Command | any; // Adicione essa propriedade para armazenar o cliente encontrado

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
    //this.apiService.getSales().subscribe(sale => {sale})

    
  }
   
  //recebe o valor do <app-order> de qual produto está sendo clicado e faz um novo array sem o produto clicaco
  removeOrderCarrinho(produto: Order) {
    const updatedOrders = this.orders.filter(order => order.product.id !== produto.product.id);
    this.orders = updatedOrders;
    this.apiService.atualizarProdutos([...updatedOrders]);
  }

  calcularTotal(): number {
    const result = this.orders.reduce((total, order) => total + order.price * order.quantity, 0);
    return +result.toFixed(2) ;
  }

  finalizarPedido(): void {
    if (this.command != '') {
       this.sale = {
          id: 0,
          order: this.orders,
          vendor: this.apiService.getLoggedInEmployee(),
          commands: this.command
       }
       this.apiInsertDelete.addSale(this.sale).subscribe();
       alertSuccess('Sucesso!', 'venda realizada para o cliente: ' + this.command.client.name)
       // Limpar os produtos selecionados ou tomar outra ação necessária
       this.apiService.atualizarProdutos([]);
       this.apiService.atualizaInputCommand ('');
    } else {
      alertFail('error!', 'comanda não encontrada')
    }
 }

  
 async pegaCommand(id:number) {
   try {
     this.commandEncontrado = await this.apiService.getCommandById(id).toPromise();
   } catch (error) {
    aletTimerErro('Comanda: '+ id + ' Não encontrada', 1500)
     console.error('Erro ao buscar comanda:', error);
   }
 }
 formatarNomeCliente(nome: string): string {
  return nome.replace(/\./g, ' ');
  }
}

