import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceCapture } from './../../../../services/serviceCapture'
@Component({
  selector: 'app-products-box-right',
  templateUrl: './products-box-right.component.html',
  styleUrls: ['./products-box-right.component.css']
})
export class ProductsBoxRightComponent {
  @Input () produtos:Array<any> | undefined;
  @Output() produtoSelecionado = new EventEmitter();

  constructor(private serviceCapture: ServiceCapture) {}

  adicionarAoCarrinho(produto : any){
    this.produtoSelecionado.emit(produto)
    this.serviceCapture.adicionarProduto(produto);
    console.log(produto)
  }
 
}
