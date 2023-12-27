import { Injectable } from '@angular/core';
import { Order, Product } from '../models/modelos';
import { api } from 'src/app/services/api.service'
import { BehaviorSubject, Observable, catchError, map, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   //buscas por string produtos
   private termoBuscaSubject = new BehaviorSubject<string>('');
   termoBusca$ = this.termoBuscaSubject.asObservable();

  //busta pela categoria
   private termoBuscaSubjectCategoia = new BehaviorSubject<string>('');
   termoBuscaCategoia$ = this.termoBuscaSubject.asObservable();


   //buscas por produtos inteiros
  private produtosSelecionadosSubject = new BehaviorSubject<any[]>([]);
  produtosSelecionados$ = this.produtosSelecionadosSubject.asObservable();

  private baseUrl :string ='';
  private productData:  Product[] | any;

  constructor(private http:HttpClient ) {
    this.baseUrl = api.produtos
    this.termoBuscaSubjectCategoia.next('Pratos');
  }

  
   //retorna todos produtos
   getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      tap(data => {
        // Certifique-se de que this.productData é um array
        if (Array.isArray(data)) {
          this.productData = data;
        } else {
          // Se não for um array, você pode querer lidar com isso de outra forma
          console.error('Os dados obtidos não são um array:', data);
        }
      }),
      catchError(error => {
        console.error('Erro ao obter produtos:', error);
        // Trate o erro conforme necessário
        throw error;
      })
    );
    }

   //pega o valor da categoria
   getCategoriaSelecionadaTipo(): string  {
    return this.termoBuscaSubjectCategoia.value;
  }
  //seta o valor da categoria
  setCategoriaSelecionadaTipo(tipo: string): void {
    this.termoBuscaSubjectCategoia.next(tipo);
  }

 //atualiza o input de busca de produtos
 atualizarValorInput(valor: string) {
  this.termoBuscaSubject.next(valor)  
}
//faz o filtro dos produtos de acordo com oque esta no imput
getProdutoNome(termoBusca: string): Product[] {
  if (termoBusca.trim() !== '') {
    // Transforma o termo de busca em minúsculas para comparar sem diferenciação entre maiúsculas e minúsculas
    termoBusca = termoBusca.toLowerCase();

    // Filtra os produtos com base no termo de busca
    return this.productData.filter((produto: { name: string; }) => produto.name.toLowerCase().includes(termoBusca));

  } else {
    // Se o campo de busca estiver vazio, retorna todos os produtos
    return this.productData;
  }
}

getProdutoPorCategoria(categoria: string): Observable<Product[]> {
  return this.getProdutos().pipe(
    map((produtos: Product[]) => produtos.filter(produto => produto.categoria === categoria))
  );
}
  // Adiciona um novo produto ou incrementa a quantidade se já existir
  adicionarOuIncrementarProduto(produto: Product) {
    this.produtosSelecionadosSubject.pipe(take(1)).subscribe(produtosCopia => {
      const produtoExistenteIndex = produtosCopia.findIndex(p => p.product.id === produto.id);
  
      if (produtoExistenteIndex !== -1) {
        // O produto já existe na cópia do array
        // Incrementa a quantidade do produto existente
        produtosCopia[produtoExistenteIndex].quantity++;
      } else {
        // O produto não existe na cópia do array
        // Adiciona o produto à cópia do array com quantidade 1
        produtosCopia.push({
          id: produto.id,
          product: {
            id: produto.id,
            price: produto.price,
            categoria: produto.categoria,
            name: produto.name,
          },
          quantity: 1,
          price: produto.price,
        });
      }
  
      this.atualizarProdutos(produtosCopia);
    });
  }
  

  // atualiza a lista e remove o produto caso o input seja <= 0
  atualizarProdutos(produtos: any[]) {
    this.produtosSelecionadosSubject.next([...produtos]);  // Garante uma nova referência do array
  }
}
