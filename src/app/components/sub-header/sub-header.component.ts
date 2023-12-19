import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderMenu {

  selectedItem: string | null = null;

  selectItem(item: string): void {
      this.selectedItem = item;
  }

  isSelected(item: string): boolean {
      return this.selectedItem === item;
  }
}
