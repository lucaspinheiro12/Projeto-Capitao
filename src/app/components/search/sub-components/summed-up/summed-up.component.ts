import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summed-up',
  templateUrl: './summed-up.component.html',
  styleUrls: ['./summed-up.component.css']
})
export class SummedUpComponent {
  @Input () testeValor: any[] =[];
}
