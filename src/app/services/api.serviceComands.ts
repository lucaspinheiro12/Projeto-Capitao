import { Injectable } from '@angular/core';
import { Command, Product,Cliente, Sale} from '../models/modelos';
import { api } from 'src/app/services/api.service'
import { BehaviorSubject, Observable, catchError, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
//Essa API faz os gets e alguns sets para visualizar os produtos e apresentalos na interface...
//ela apenas faz a função de apresentar os produtos na tela, e buscar a command do client 
export class ApiService {
   //buscas por string produtos
   private termoBuscaSubject = new BehaviorSubject<string>('');
   termoBusca$ = this.termoBuscaSubject.asObservable();

  //busta pela categoria
   private termoBuscaSubjectCategoia = new BehaviorSubject<string>('');
   termoBuscaCategoia$ = this.termoBuscaSubject.asObservable();

   private commandSelecionadoSubject = new BehaviorSubject<Command| any>([]);
   commandSelecionado$ = this.commandSelecionadoSubject.asObservable();

   //buscas por produtos inteiros
  private produtosSelecionadosSubject = new BehaviorSubject<any[]>([]);
  produtosSelecionados$ = this.produtosSelecionadosSubject.asObservable();

  private baseUrlProdutos :string ='';
  private productData:  Product[] | any;

  private baseUrlClient: string = '';
  private clientData:  Cliente[] | any;

  private baseUrlCommand:string = '';
  private commandData:  Command[] =[]; 
  private commandCap!:Command

  private baseUrlSale :string ='';
  private SaleData:  Product[] | any;

  constructor(private http:HttpClient ) {
    this.baseUrlProdutos = api.produtos;

    this.baseUrlClient =api.clients;

    this.baseUrlCommand = api.command;

    this.baseUrlSale = api.vendas
    this.termoBuscaSubjectCategoia.next('Pratos');
  }

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrlClient).pipe(
      tap(data => {
        // Certifique-se de que this.productData é um array
        if (Array.isArray(data)) {
          this.clientData = data;
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
  getSales():Observable<Sale[]|any> {
    return this.http.get<Sale[]|any>(this.baseUrlSale).pipe(
      tap(data => {
        // Certifique-se de que this.productData é um array
        if (Array.isArray(data)) {
          this.SaleData = data;
          console.log(this.SaleData)
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

  getCommand() :Observable<Command[]> {
    return this.http.get<Command[]>(this.baseUrlCommand).pipe(
      tap(data => {
        // Certifique-se de que this.productData é um array
        if (Array.isArray(data)) {
          this.commandData = data;
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
  getCommandById(id: number): Observable<Command | any> {
    return this.http.get<Command>(`${this.baseUrlCommand}/${id}`).pipe(
      map(res => {
        if (res && res.id == id) {
          this.commandSelecionadoSubject.next(res)
          return res;   
        } else {
          console.log("Comanda não encontrada");
          return null;
        }
      }),
      catchError(error => {
        console.error('Numero da commanda não encontrada:', error);
        // Trate o erro conforme necessário
        throw error;
      })
    );
  }

   //retorna todos produtos
   getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrlProdutos).pipe(
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

  atualizaInputCommand (command:string){
    this.commandSelecionadoSubject.next(command);
  }

}
