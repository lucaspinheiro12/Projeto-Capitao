import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/modelos';
import { ApiService } from 'src/app/services/api.serviceComands';
@Component({
  selector: 'app-products-box-right',
  templateUrl: './products-box-right.component.html',
  styleUrls: ['./products-box-right.component.css']
})
export class ProductsBoxRightComponent {
  @Input () produtosBox:Array<Product | any> = [];

  constructor(private apiService: ApiService) {}

  adicionarAoCarrinho(produto : Product){
    this.apiService.adicionarOuIncrementarProduto(produto);
  }
 
}
