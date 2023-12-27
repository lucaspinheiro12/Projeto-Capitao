import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from 'src/app/services/api.serviceComands';
import { Order, Product } from 'src/app/models/modelos';
@Component({
  selector: 'app-box-order',
  templateUrl: './box-order.component.html',
  styleUrls: ['./box-order.component.css']
})
export class BoxOrderComponent implements OnInit{
  constructor(private apiService: ApiService) {}

  orders : Order[] =[];
  ngOnInit() {
    this.apiService.produtosSelecionados$.subscribe(produtos => {
      this.orders = produtos.map(produto => this.transformarParaOrder(produto));
    });

  }
  transformarParaOrder(produto: any): Order {
    if (this.isOrder(produto)) {
      // Se já for um Order, retorna o próprio objeto
      return produto;
    }
  
    // Se não for um Order, cria um novo objeto Order com base nas propriedades
    return {
      id: 0,
      product: {
        id: produto.id,
        price: produto.price,
        categoria: produto.categoria,
        name: produto.name,
      },
      quantity: 1,
      price: produto.price,
    };
  }
  
  isOrder(obj: any): obj is Order {
    // Função auxiliar para verificar se um objeto é do tipo Order
    return obj && 'id' in obj && 'product' in obj && 'quantity' in obj && 'price' in obj;
  }

  removeOrder(produto: Order) {
    const index = this.orders.findIndex(order => order.id === produto.id);
    if (index !== -1) {
      console.log('Antes da remoção:', this.orders);
      const updatedOrders = [...this.orders.slice(0, index), ...this.orders.slice(index + 1)];
      this.orders = updatedOrders;
      this.apiService.atualizarProdutos([...updatedOrders]);
      console.log('Após a remoção:', this.orders);
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
    //const clienteEncontrado = this.apiService.getClienteAtual();
    //if (clienteEncontrado) {
     // const produtosSelecionados = this.produtosSelecionados;
     // this.apiService.adicionarProdutosAoCliente(clienteEncontrado, produtosSelecionados);
      // Limpar os produtos selecionados ou tomar outra ação necessária
      this.apiService.atualizarProdutos([]);
    ///} else {
      console.log('Cliente não encontrado');
    //}
  }
}  
    

