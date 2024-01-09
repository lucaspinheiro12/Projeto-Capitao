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
      console.log(this.currentRoute)
    });
  }

 
  onValorInputChange() {
    console.log(this.currentRoute)
    //console.log(this.currentRoute.subscribe(res => console.log(res)))
   /* if(this.currentRoute.includes('/sales')){
      console.log("sales")
    }else if(this.currentRoute.includes('/')){
      console.log('cadastro')
    }*/
    this.apiService.atualizarValorInput(this.valorInput);
  }

}
