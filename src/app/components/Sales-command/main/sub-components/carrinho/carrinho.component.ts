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


  testeSemBanco: Order[] =[
    {
      id: 1,
      product: {id:1,
        name: 'string',
        price:21,
        categoria:'sd'},
      quantity: 2,
      price: 42
    },
    {
      id: 2,
      product: {id:2,
        name: 'string2',
        price:211,
        categoria:'sd2'},
      quantity: 22,
      price: 422
    },
    {
      id: 3,
      product: {id:3,
        name: 'string3',
        price:311,
        categoria:'sd3'},
      quantity: 33,
      price: 332
    }, {
      id: 4,
      product: {id:4,
        name: 'string4',
        price:411,
        categoria:'sd4'},
      quantity: 44,
      price: 444
    },

  ]

  
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
   
  //recebe o valor do <app-order> de qual produto está sendo clicado e faz um novo array sem o produto clicaco
  removeOrderCarrinho(produto: Order) {
    const updatedOrders = this.orders.filter(order => order.product.id !== produto.product.id);
    console.log(updatedOrders)
    this.orders = updatedOrders;
    this.apiService.atualizarProdutos([...updatedOrders]);
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

