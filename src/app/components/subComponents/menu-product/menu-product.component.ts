import { Component, OnInit } from '@angular/core';
import { ServiceCapture } from 'src/app/services/serviceCapture';

@Component({
  selector: 'menu-product-menu',
  templateUrl: './menu-product.component.html',
  styleUrls: ['./menu-product.component.css']
})
export class MenuProductComponent implements OnInit {

  constructor(private serviceCapture: ServiceCapture) {
  }
  valorInput: string = '';
  ngOnInit() {
    this.serviceCapture.termoBusca$.subscribe((novoValor) => {
      this.valorInput = novoValor;
      this.getProdutosFiltrados(); // Chame a função de filtro aqui
    });
  }
  listProduto: any[] = this.serviceCapture.getprodutos();

  getProdutosFiltrados(): any[] {
    // Obter o tipo da categoria selecionada
    const tipoCategoriaSelecionada = this.serviceCapture.getCategoriaSelecionadaTipo();
    let valorRecebido = this.serviceCapture.getProdutoNome(this.valorInput);

    // Filtrar os produtos com base no tipo da categoria selecionada
    if (this.valorInput.trim() !== '') {
      // Se há um valor de entrada, filtrar pelos resultados da busca
      return valorRecebido;
    } else if (tipoCategoriaSelecionada !== null) {
      // Se não há valor de entrada, mas há um tipo selecionado, filtrar por tipo
      return this.listProduto.filter(produto => produto.tipo === tipoCategoriaSelecionada);
    } else {
      // Se nenhum tipo de categoria foi selecionado e nenhum valor de entrada, retornar todos os produtos
      return this.listProduto;
    }
  }
}
