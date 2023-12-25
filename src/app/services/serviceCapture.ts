import { Injectable, } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ServiceCapture {
  listclientProduto:any[] = [];
  listaClientes = [
    { id: 1,comanda:10, nome: 'lucas', entrada:15.00 },{ id: 2,comanda:20, nome: 'lucas2', entrada:25.00 },{ id: 3,comanda:30, nome: 'lucas3', entrada:35.00 },
    { id: 4,comanda:40, nome: 'lucas4', entrada:45.00 }
  ]
  listaProduto = [
    { id: 1, nome: 'capricho', preco: 912.10, tipo: 1 },
    { id: 2, nome: 'mix', preco: 92.10, tipo: 1 },
    { id: 3, nome: 'isca', preco: 292.10, tipo: 1 },
    { id: 4, nome: 'balde spaten', preco: 252.10, tipo: 1 },
    { id: 5, nome: 'camarao', preco: 212.10, tipo: 1 },
    { id: 6, nome: 'balde Original', preco: 562.10, tipo: 2 }, { id: 7, nome: 'caipira', preco: 62.10, tipo: 2 }, { id: 8, nome: 'kalzone frango', preco: 72.10, tipo: 2 }
    , { id: 9, nome: 'mega ligado', preco: 42.10, tipo: 3 },
    { id: 10, nome: 'suco 700', preco: 12.10, tipo: 4 }, { id: 11, nome: 'msp carne', preco: 32.10, tipo: 5 }
  ]

  private clienteAtual: any;
  //buscas por string
  private termoBuscaSubject = new BehaviorSubject<string>('');
  termoBusca$ = this.termoBuscaSubject.asObservable();

  //buscas por produtos inteiros
  private produtosSelecionadosSubject = new BehaviorSubject<any[]>([]);
  produtosSelecionados$ = this.produtosSelecionadosSubject.asObservable();

  //buscas por tipo ou id
  private categoriaSelecionadaTipoSubject = new BehaviorSubject<number | null>(null);
  categoriaSelecionadaTipo$ = this.categoriaSelecionadaTipoSubject.asObservable();

  // Adiciona um novo produto ou incrementa a quantidade se já existir
  adicionarOuIncrementarProduto(produto: any) {
    const produtosCopia = this.produtosSelecionadosSubject.value; // Cria uma cópia do array original
    const produtoExistenteIndex = produtosCopia.findIndex(p => p.id === produto.id);

    if (produtoExistenteIndex !== -1) {
      // O produto já existe na cópia do array
      // Incrementa a quantidade do produto existente
      produtosCopia[produtoExistenteIndex].quantidade++;
    } else {
      // O produto não existe na cópia do array
      // Adiciona o produto à cópia do array com quantidade 1
      produtosCopia.push({ ...produto, quantidade: 1 });
    }

    this.atualizarProdutos(produtosCopia);
  }

  //pega todos produtos
  getprodutos(): any[] {
    return this.listaProduto;
  }
  //pega todos produtosSelecionados
  getprodutosSelecionados(): any[] {
    return this.produtosSelecionadosSubject.value;
  }
  //seta os produtos
  setProdutos(produtos: any[]) {
    this.produtosSelecionadosSubject.next(produtos);
  }
  //atualiza o input de busca de produtos
  atualizarValorInput(valor: string) {
    this.termoBuscaSubject.next(valor);
  }
  //faz o filtro dos produtos de acordo com oque esta no imput
  getProdutoNome(termoBusca: string): any[] {
    if (termoBusca.trim() !== '') {
      // Transforma o termo de busca em minúsculas para comparar sem diferenciação entre maiúsculas e minúsculas
      termoBusca = termoBusca.toLowerCase();

      // Filtra os produtos com base no termo de busca
      return this.getprodutos().filter(produto => produto.nome.toLowerCase().includes(termoBusca));

    } else {
      // Se o campo de busca estiver vazio, retorna todos os produtos
      return this.getprodutos();
    }
  }
  //pega o valor da categoria
  getCategoriaSelecionadaTipo(): number | null {
    return this.categoriaSelecionadaTipoSubject.value;
  }
  getCliente(nome:string): any{
    this.termoBuscaSubject.next(nome);
  }
  //seta o valor da categoria
  setCategoriaSelecionadaTipo(tipo: number): void {
    this.categoriaSelecionadaTipoSubject.next(tipo);
  }

  // atualiza a lista e remove o produto caso o input seja <= 0
  atualizarProdutos(produtos: any[]) {
    this.produtosSelecionadosSubject.next(produtos);
  }

  //pega os produtos pega categoria
  getProdutosPorTipo(tipo: number): Observable<any[]> {
    return this.produtosSelecionados$.pipe(
      map(produtos => produtos.filter(produto => produto.tipo === tipo))
    );
  }
//clientes

getClientes ():any[]  {
  return this.listaClientes;
}
getClientePorCommand(command: number): Observable<any | undefined> {
  const clienteEncontrado = this.listaClientes.find(cliente => cliente.comanda === command);
  return clienteEncontrado ? of(clienteEncontrado) : of(undefined);
}

// Método para obter um cliente pelo nome
getClientePorNome(nome: string): Observable<any | undefined> {
  return this.produtosSelecionados$.pipe(
    map(clientes => clientes.find(cliente => cliente.nome.toLowerCase() === nome.toLowerCase()))
  );
}

  // Adiciona a relação entre um cliente e os produtos selecionados
  adicionarProdutosAoCliente(cliente: any, produtos: any[]): void {
    const clienteProduto = { cliente, produtos };
    this.listclientProduto.push(clienteProduto);
    console.log(this.listclientProduto)
  }

  // Obtém a lista de produtos associados a um cliente
  getProdutosDoCliente(cliente: any): any[] {
    const clienteProduto = this.listclientProduto.find(cp => cp.cliente === cliente);
    return clienteProduto ? clienteProduto.produtos : [];
  }

  getClienteAtual(): any {
    return this.clienteAtual;
  }

  setClienteAtual(cliente: any): void {
    this.clienteAtual = cliente;
  }
}