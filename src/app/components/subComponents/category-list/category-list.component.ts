import { Component } from '@angular/core';
import { ServiceCapture } from './../../../services/serviceCapture'
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  constructor(private serviceCapture: ServiceCapture) { }
  selectedItem: string = 'Pratos';

  selectItem(nomeCategoria: string, tipo: number) {
    this.selectedItem = nomeCategoria;
     this.serviceCapture.setCategoriaSelecionadaTipo(tipo);
  }
  selectItemTipo(tipoSelecionado: number) {
    
  }
  isSelected(item: string): boolean {
      return this.selectedItem === item;
  }
}
