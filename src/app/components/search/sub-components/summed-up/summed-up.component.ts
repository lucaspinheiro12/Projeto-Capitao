import { Component, Input } from '@angular/core';
import { SaleSummedUp } from 'src/app/models/modelos';

@Component({
  selector: 'app-summed-up',
  templateUrl: './summed-up.component.html',
  styleUrls: ['./summed-up.component.css']
})
export class SummedUpComponent {
  @Input () resultValue: SaleSummedUp  |any;

}
