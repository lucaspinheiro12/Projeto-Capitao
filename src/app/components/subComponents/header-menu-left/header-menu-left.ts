import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.serviceComands';
import { ServiceCapture } from 'src/app/services/serviceCapture';

@Component({
  selector: 'app-header-menu-left',
  templateUrl: './header-menu-left.html',
  styleUrls: ['./header-menu-left.css']
})
export class HeaderMenuLeftComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {

  }
  valorInput: string = '';


  onValorInputChange() {
    this.apiService.atualizarValorInput(this.valorInput);
  }
}
