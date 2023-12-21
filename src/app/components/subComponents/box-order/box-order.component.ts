import { Component, OnInit } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { ServiceCapture } from 'src/app/services/serviceCapture';
@Component({
  selector: 'app-box-order',
  templateUrl: './box-order.component.html',
  styleUrls: ['./box-order.component.css']
})
export class BoxOrderComponent {
  valueNull: boolean[] = [true, true, true, true, true, true, true];

  removeOrder(index: number) {
    this.valueNull[index] = false;
  } 
}
