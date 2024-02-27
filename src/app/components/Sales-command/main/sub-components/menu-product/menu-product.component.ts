import { Component, OnInit } from '@angular/core';
import { defaultIfEmpty, first, map } from 'rxjs';
import { Product } from 'src/app/models/modelos';
import { ApiService } from 'src/app/services/api.serviceComands';


@Component({
  selector: 'menu-product-menu',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {
 
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
      // Chama a lógica de filtragem diretamente, se necessário
      const produtosFiltrados = this.getProdutosFiltrados();
      // Faça algo com os produtos filtrados, se necessário
    });
  }
  
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
  

  /*getProdutosFiltrados(): any[] {
    // Obter o tipo da categoria selecionada
    const tipoCategoriaSelecionada = this.apiService.getCategoriaSelecionadaTipo();
        // Filtrar os produtos com base no tipo da categoria selecionada
    if (tipoCategoriaSelecionada !== null && this.valorInput.trim() == '' ) {
      // Se não há valor de entrada, mas há um tipo selecionado, filtrar por tipo
      this.newArrayProd = this.listProduto.filter((produto: { categoria: string  }) => produto.categoria === tipoCategoriaSelecionada);
      return this.newArrayProd;

      //filtrar com base no valor do input
    } else if (this.valorInput.trim() !== '') {
      // Se há um valor de entrada, filtrar pelos resultados da busca
      return this.apiService.getProdutoNome(this.valorInput)
    }else {
      return this.listProduto;
    }
  }*/
}
