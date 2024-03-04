import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order, Product } from 'src/app/models/modelos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
  @Input() produto:  Order|any;
  @Output() valueZero = new EventEmitter<Order>();
  
  ngOnInit() {
    // Garante que o valor inicial seja 1
    if (!this.produto.quantity || this.produto.quantity < 1) {
      this.produto.quantity = 1;
    }
  }

  decreaseValue() {
    if (this.produto.quantity > 0) {
      this.produto.quantity--;

      if (this.produto.quantity === 0) {
        this.removeOrder();
      }
    }
  }
  removeOrder() {
    Swal.fire({
      title: "Deseja remover: " + this.produto.product.name ,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText:"Não"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Produto: " + this.produto.product.name,
          text: "Removido com sucesso!",
          icon: "success"
        });
        this.valueZero.emit(this.produto);
      }else{
        if(this.produto.quantity <= 0 )
        this.increaseValue();
      }
    });

  }

  increaseValue() {
    this.produto.quantity++;
  }
}
