import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order, Product } from 'src/app/models/modelos';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],

})
export class OrderComponent implements OnInit {
  @Input() produto:  Order|any;
  @Output() valueZero = new EventEmitter<void>();
  
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
        this.valueZero.emit();
      }
    }
  }

  increaseValue() {
    this.produto.quantity++;
  }
}
