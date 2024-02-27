import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  menuAberto = false;
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
    console.log( this.menuAberto)
  }
  
  fecharMenu() {
    this.menuAberto = false;
    console.log( this.menuAberto)
  }
}
