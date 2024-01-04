import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.serviceComands';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchNameComponent {

  constructor(private apiService: ApiService) { }

  valorInput: string = '';


  onValorInputChange() {
    this.apiService.atualizarValorInput(this.valorInput);
  }

}
