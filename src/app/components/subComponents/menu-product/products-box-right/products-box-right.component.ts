import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { product } from 'src/app/models/modelos';
import { ApiService } from 'src/app/services/api.serviceComands';
@Component({
  selector: 'app-products-box-right',
  templateUrl: './products-box-right.component.html',
  styleUrls: ['./products-box-right.component.css']
})
export class ProductsBoxRightComponent {
  @Input () produtosBox:Array<product | any> = [];

  constructor(private apiService: ApiService) {}

  adicionarAoCarrinho(produto : any){
    this.apiService.adicionarOuIncrementarProduto(produto);
  }
 
}
