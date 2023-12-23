import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() produto: any;
 // @Input() valueInput: number =1;
  @Output() valueZero = new EventEmitter<void>();
  
  ngOnInit() {
    // Garante que o valor inicial seja 1
    if (!this.produto.quantidade || this.produto.quantidade < 1) {
      this.produto.quantidade = 1;
    }
  }

  decreaseValue() {
    if (this.produto.quantidade > 0) {
      this.produto.quantidade--;

      if (this.produto.quantidade === 0) {
        this.valueZero.emit();
      }
    }
  }

  increaseValue() {
    this.produto.quantidade++;
  }
}
