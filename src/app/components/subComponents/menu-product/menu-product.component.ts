import { Component } from '@angular/core';

@Component({
  selector: 'menu-product-menu',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent {
listaProduto = [
    { id:1,nome:'capricho',preco: 912.10  },
    {  id:2,nome:'mix' ,preco: 92.10 },
    { id:3, nome: 'isca'  ,preco: 292.10 },
    {  id:4, nome: 'balde spaten' ,preco: 252.10 },
    { id:5, nome: 'camarao'  ,preco: 212.10 },
    {  id:6, nome:'balde Original' ,preco: 562.10 },{   id:7, nome:'caipira' ,preco: 62.10},{    id:8, nome:'kalzone frango',preco: 72.10}
    ,{    id:9, nome:'mega ligado',preco: 42.10},
    {  id:10, nome: 'suco 700',preco: 12.10 },{   id:11, nome:'msp carne' ,preco: 32.10}
  ]
}
