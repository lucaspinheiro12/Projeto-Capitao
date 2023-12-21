import { Component } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  selectedItem: string | null = null;

  selectItem(item: string): void {
      this.selectedItem = item;
  }

  isSelected(item: string): boolean {
      return this.selectedItem === item;
  }
}
