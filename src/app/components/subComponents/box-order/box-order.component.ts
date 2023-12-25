import { Component, Input, OnInit } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { ServiceCapture } from 'src/app/services/serviceCapture';
@Component({
  selector: 'app-box-order',
  templateUrl: './box-order.component.html',
  styleUrls: ['./box-order.component.css']
})
export class BoxOrderComponent implements OnInit{
  constructor(private serviceCapture: ServiceCapture) {}

  ngOnInit() {
    this.serviceCapture.produtosSelecionados$.subscribe(produtos => {
      this.produtosSelecionados = produtos;
    });
  }
   produtosSelecionados: any[] = [];

  removeOrder(produto: any) {
    const index = this.produtosSelecionados.indexOf(produto);
    if (index !== -1) {
      this.produtosSelecionados.splice(index, 1);
      this.serviceCapture.atualizarProdutos(this.produtosSelecionados);
    }
  }
  calcularTotal(): Number { 
    return (this.produtosSelecionados.reduce((total, produto) => total + produto.preco * produto.quantidade, 0) + this.calcularTaxa()).toFixed(2);
  }
  calcularTaxa(): number {
    const taxa = this.produtosSelecionados.reduce((total, produto) => total + produto.preco * produto.quantidade, 0) * 0.1;
    return +taxa.toFixed(2);
  } 

  finalizarPedido(): void {
    const clienteEncontrado = this.serviceCapture.getClienteAtual();
    if (clienteEncontrado) {
      const produtosSelecionados = this.produtosSelecionados;
      this.serviceCapture.adicionarProdutosAoCliente(clienteEncontrado, produtosSelecionados);
      // Limpar os produtos selecionados ou tomar outra ação necessária
      this.serviceCapture.atualizarProdutos([]);
    } else {
      console.log('Cliente não encontrado');
    }
  }
}  
    

