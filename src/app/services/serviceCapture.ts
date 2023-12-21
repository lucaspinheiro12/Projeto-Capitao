import { Injectable,ViewContainerRef, ApplicationRef, Injector, ComponentRef  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderComponent } from '../components/subComponents/box-order/order/order.component';

@Injectable({
  providedIn: 'root',
})
export class ServiceCapture {
  
  //remove o component <app-order> quando a quantidade dele foz 0
  private valueNullSubject = new BehaviorSubject<boolean>(true);
  valueNull$ = this.valueNullSubject.asObservable();

  updateValueNull(valueNull: boolean) {
    this.valueNullSubject.next(valueNull);
  }


}