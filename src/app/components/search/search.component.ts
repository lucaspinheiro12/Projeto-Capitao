import { Component } from '@angular/core';
import { ApiService } from '../../services/api.serviceComands';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  test: any = [
    {
      "id": null,
      "product": {
          "id": 1,
          "name": "Capricho",
          "price": 89,
          "categoria": "Pratos"
      },
      "quantity": 1,
      "price": 97.9
  },
  {
      "id": null,
      "product": {
          "id": 3,
          "name": "Balde Original",
          "price": 80,
          "categoria": "Cervejas e Chopp"
      },
      "quantity": 1,
      "price": 88
  },
  {
      "id": null,
      "product": {
          "id": 4,
          "name": "Cap Cebola",
          "price": 49.4,
          "categoria": "Pratos"
      },
      "quantity": 3,
      "price": 163.02
  }
  ]
  testC: any ={
    "id": 1,
        "client": {
            "cpf": "1",
            "name": "xf",
            "contact": "1"
        },
        "entry": 1,
        "fullValue": 469.51
  }
  constructor(private apiService: ApiService){}
  checkbox1: boolean = false;
  checkbox2: boolean = true;
  checkbox3: boolean = false;
  selectedItem: string = 'resumido';
  mostrarPedidoResumido: boolean = true;
  mostrarPedidoDetalhado: boolean = false;

  updateCheckboxes(checkboxNumber: number): void {
    // Desmarca todos os checkboxes
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.checkbox3 = false;

    // Marca apenas o checkbox clicado
    if (checkboxNumber === 1) {
      this.checkbox1 = true;
    } else if (checkboxNumber === 2) {
      this.checkbox2 = true;
    } else if (checkboxNumber === 3) {
      this.checkbox3 = true;
    }
  }

  selectType(nomeCategoria: string) {
    this.selectedItem = nomeCategoria;
     this.apiService.setTypeSelected(this.selectedItem);
  }
  
  isSelectedType(item: string): boolean {
      return this.selectedItem === item;
  }
  showPedidoResumido(): void {
    this.mostrarPedidoResumido = true;
    this.mostrarPedidoDetalhado = false;
  }

  showPedidoDetalhado(): void {
    this.mostrarPedidoResumido = false;
    this.mostrarPedidoDetalhado = true;
  }
}
