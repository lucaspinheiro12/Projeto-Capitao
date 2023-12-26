import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.serviceComands';
import { product } from 'src/app/models/modelos';
@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit {
 
  constructor(private apiService: ApiService){
    
  }

  ngOnInit(): void {
    this.apiService.getProdutos().subscribe(
      {
        next: (result) => console.log(result),
        error: (err) => console.log(err)
      }
    )
  }
  
}
