import { Component, OnInit } from '@angular/core';
import { ServiceCapture } from 'src/app/services/serviceCapture';

@Component({
  selector: 'app-header-menu-left',
  templateUrl: './header-menu-left.html',
  styleUrls: ['./header-menu-left.css']
})
export class HeaderMenuLeftComponent implements OnInit {

  constructor(private serviceCapture: ServiceCapture) { }
  ngOnInit(): void {

  }
  valorInput: string = '';

  buscarProdutos() {
    this.serviceCapture.getProdutoNome(this.valorInput)
  }

  onValorInputChange() {
    this.serviceCapture.atualizarValorInput(this.valorInput);
  }
}
