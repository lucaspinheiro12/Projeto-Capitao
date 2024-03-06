import { Component } from '@angular/core';
import { ApiService } from './services/api.serviceComands';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) {}
  showMenu(): boolean {
    return this.apiService.isLoggedIn();
  }
  title = 'Comanda-Capitao';
}
