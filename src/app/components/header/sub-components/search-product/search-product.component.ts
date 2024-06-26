import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ApiService } from 'src/app/services/api.serviceComands';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchNameComponent implements OnInit {

  constructor(private apiService: ApiService, private activaRoute: ActivatedRoute, private router: Router) { 
    
  }
  private currentRoute = '';
  protected valorInput: string = '';
  public showInput: boolean = false;

  ngOnInit() {
      //pega o valor da rota
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
       this.currentRoute = this.router.url;
       this.showInput = !this.currentRoute.includes('/register'); // Mostra o input se a rota não incluir "/register"
    });
  }

 
  onValorInputChange() {
    if(this.currentRoute === ('/')){
    }else if( this.currentRoute.includes('/sales')){
      this.apiService.atualizarValorInputVendas(this.valorInput);
    }else if (this.currentRoute.includes('/search')){
      this.apiService.atualizarValorInputBuscar(this.valorInput);
    }
  }
    
}

