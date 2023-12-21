import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceCapture } from './../../../../services/serviceCapture'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() valueInput: number =1;

  @Output() valueZero = new EventEmitter<void>();
  productName: string = 'sd';

  decreaseValue() {
    if (this.valueInput > 0) {
      this.valueInput--;
      if (this.valueInput === 0) {
        this.valueZero.emit(); // Emita o evento quando o valor chegar a 0
      }
    }
  }
  increaseValue() {
    this.valueInput++;
  }
}
