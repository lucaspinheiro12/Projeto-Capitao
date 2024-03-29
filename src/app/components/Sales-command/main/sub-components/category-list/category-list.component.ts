import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.serviceComands';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  constructor(private apiService: ApiService) { }
  selectedItem: number = 1;

  selectItem(numeroCategoria: number) {
    this.selectedItem = numeroCategoria;
     this.apiService.setCategoriaSelecionadaTipo(this.selectedItem);
  }
  
  isSelected(item: number): boolean {
      return this.selectedItem === item;
  }
}
