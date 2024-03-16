import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/modelos';
import { ApiService } from 'src/app/services/api.serviceComands';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  valorInput: string = '';
  listProduto!:  Product[];
  newArrayProd:  Product[]|any;
  ngOnInit() {
   this.apiService.getProdutos().subscribe(
     (result) => {
       this.listProduto = result;
     },
     (error) => {
       console.error(error);
     }
   );
 
   this.apiService.termoBusca$.subscribe((novoValor) => {
     this.valorInput = novoValor;
     // Chama a lógica de filtragem diretamente, se necessário2
     const produtosFiltrados = this.getProdutosFiltrados();
     // Faça algo com os produtos filtrados, se necessário
   });
 }

 //meno carrinho
   menuAberto = false;
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
   //meno carrinho
  fecharMenu() {
    this.menuAberto = false;
  }

  //pega os produtos filtrados pela sua categoria ou pelo nome no input. 
    getProdutosFiltrados(): Product[] {
      if (!this.listProduto) {
        return [];
      }  
      const tipoCategoriaSelecionada = this.apiService.getCategoriaSelecionadaTipo();
    
      if (tipoCategoriaSelecionada !== null && this.valorInput.trim() === '') {
        return this.listProduto.filter((produto: Product) => produto.categoria === tipoCategoriaSelecionada);
      } else if (this.valorInput.trim() !== '') {
        return this.apiService.getProdutoNome(this.valorInput);
      } else {
        return this.listProduto;
      }
    }
  }