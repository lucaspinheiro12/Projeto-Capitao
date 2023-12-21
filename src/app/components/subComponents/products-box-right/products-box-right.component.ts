import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-box-right',
  templateUrl: './products-box-right.component.html',
  styleUrls: ['./products-box-right.component.css']
})
export class ProductsBoxRightComponent {
  @Output() boxClicked = new EventEmitter<void>();

  // ... outros métodos ou propriedades

  onBoxClick() {
    this.boxClicked.emit();
  }
}
