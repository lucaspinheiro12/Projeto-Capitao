import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.serviceComands';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  constructor(private apiService: ApiService) { }
  selectedItem: string = 'Pratos';

  selectItem(nomeCategoria: string) {
    this.selectedItem = nomeCategoria;
     this.apiService.setCategoriaSelecionadaTipo(this.selectedItem);
  }
  
  isSelected(item: string): boolean {
      return this.selectedItem === item;
  }
}
