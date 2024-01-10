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
  valorInput: string = '';

  ngOnInit() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
       this.currentRoute = this.router.url;
    });
  }

 
  onValorInputChange() {
    if(this.currentRoute === ('/')){
      console.log("no cadastro")
    }else if( this.currentRoute.includes('/sales')){
      this.apiService.atualizarValorInputVendas(this.valorInput);
    }else if (this.currentRoute.includes('/search')){
      this.apiService.atualizarValorInputBuscar(this.valorInput);
    }
  }

}
