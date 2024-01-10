import { Component, Input } from '@angular/core';
import { Sale } from 'src/app/models/modelos';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css']
})
export class DetailedComponent {

  @Input () resultDetalhado: Sale[] = []

  teste(){
    console.log(this.resultDetalhado)
  }
}
