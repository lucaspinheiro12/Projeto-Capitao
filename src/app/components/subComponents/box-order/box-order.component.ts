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
  calcularTotal(): number {
    return this.produtosSelecionados.reduce((total, produto) => total + produto.preco * produto.quantidade, 0) + this.calcularTaxa();
  }
  calcularTaxa(): number {
    return this.produtosSelecionados.reduce((total, produto) => total + produto.preco * produto.quantidade, 0) * 0.1;
  }
}  
    

