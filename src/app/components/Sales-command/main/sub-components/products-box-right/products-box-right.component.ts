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
    console.log(produto)
    console.log(produto.img)
  }
 
}
//https://th.bing.com/th/id/OIP.0c-7Y21JeOFRV-gTyLUMjAHaE8?rs=1&pid=ImgDetMain