import { Injectable } from '@angular/core';
import { Command, Product,Cliente, Sale, SaleSummedUp, Employee} from '../models/modelos';
import { api } from 'src/app/services/api.service'
import { BehaviorSubject, Observable, catchError, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
/**
 * Serviço para interação com a API, busca de dados e manipulação de estados.
 */ 
export class ApiService {

   //atualiza o input e buscas por string os produtos somente na aba vendas
   private termoBuscaSubject = new BehaviorSubject<string>('');
   termoBusca$ = this.termoBuscaSubject.asObservable();

  //atualiza o input e buscas por string os clientes somente na aba Busca
   private termoBuscaClientSubject = new BehaviorSubject< any>('');
   termoClientBusca$ = this.termoBuscaClientSubject.asObservable();
   
  //busta pela categoria
   private termoBuscaSubjectCategoia = new BehaviorSubject<string>('');
   termoBuscaCategoia$ = this.termoBuscaSubject.asObservable();

   //define o type da busca
   private termoBuscaSubjectType = new BehaviorSubject<string>('');
   termoBuscaType$ = this.termoBuscaSubject.asObservable();

  //atualiza o input e buscas da comanda
   private commandSelecionadoSubject = new BehaviorSubject<Command| any>([]);
   commandSelecionado$ = this.commandSelecionadoSubject.asObservable();

   //buscas por produtos inteiros
  private produtosSelecionadosSubject = new BehaviorSubject<any[]>([]);
  produtosSelecionados$ = this.produtosSelecionadosSubject.asObservable();

  private baseUrlProdutos :string ='';
  private productData:  Product[] | any;

  private baseUrlClient: string = '';
  private clientData:  Cliente[] | any;

  private clientBuscaResumido:  SaleSummedUp | any;
  private clientBuscaDetalhado:  Sale[] | any;
  
  private baseUrlCommand:string = '';
  private commandData:  Command[] =[]; 
  private commandCap!:Command

  private baseUrlSale :string ='';
  private SaleData:  Product[] | any;

  private baseUrlEmployee: string = '';
  private employeeLog: Employee | any;
  private isAuthenticated: boolean = false;

  constructor(private http:HttpClient ) {
    this.baseUrlProdutos = api.produtos;

    this.baseUrlClient =api.clients;

    this.baseUrlCommand = api.command;

    this.baseUrlSale = api.vendas
    this.termoBuscaSubjectCategoia.next('Pratos');

    this.baseUrlEmployee = api.employee;
  }

  /**
   * Obtém a lista de clientes.
   * @returns Observable<Cliente[]>
   */
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
        console.error('Erro ao obter Cliente:', error);
        // Trate o erro conforme necessário
        throw error;
      })
    );
  }

  
/** 
  * Obtém a lista de vendas.
   * @returns Observable<Sale[]>
   */
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
  /** 
  * Obtém a lista de comandas.
  * @returns Observable<Command[]>
  */
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

  /** 
  * Obtém a lista de produtos.
  * @returns  Observable<Product[]>
  */
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

  /**
   * Obtém um cliente sem vendas pelo ID.
   * @param result - ID do cliente
   * @returns Observable<any>
   */
  getClientSemVendasId(result:any):Observable<any>{
    return this.http.get<Command | any>(`${this.baseUrlCommand}/${result}`).pipe(
      tap(data => {
        this.clientData = data;
      }),
      catchError(error =>{
        console.log('error ao obter o cliente', error)
        throw error
      })
    )
  }
  /**
   * Obtém os funcionarios.
   * @returns Observable<Employee>
   */
  getEmployee():Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrlEmployee).pipe(
      tap(data => {
        // Certifique-se de que this.productData é um array
        if (Array.isArray(data)) {
          this.employeeLog = data;
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

  /**
   * Obtém um cliente sem vendas pelo cpf e pelo nome.
   * @param result - cpf ou nome do cliente
   * @param type - criterio da busca
   * @returns Observable<any>
   */
  getClientSemVendasCPFName(type: string, result:any):Observable<any>{
    return this.http.get<Command | any>(`${this.baseUrlCommand}/${type}/${result}`).pipe(
      tap(data => {
        this.clientData = data;
      }),
      catchError(error =>{
        console.log('error ao obter o cliente', error)
        throw error
      })
    )

  }
  
  /** 
   * Obtém um cliente com vendas detalhadas pelo critério de busca (cpf,nome,idComanda)
   * @param type - criterio da busca
   * @param value - valor do cliente a ser buscado
   * @returns Observable<any>
   */
  getClientSalesDetalhado(type: string, value: string): Observable<any> {
    const endpoint = `${this.baseUrlSale}/client/${type}/${value}`;
    return this.http.get<Sale>(endpoint).pipe(
      tap(data => {
        this.clientBuscaDetalhado = data;
      }),
      catchError(error => {
        console.log('Erro ao obter o cliente com as vendas', error);
        throw error;
      })
    );
  }


/** 
   * Obtém um cliente com vendas resumido pelo critério de busca (cpf,nome,idComanda)
   * @param type - criterio da busca
   * @param value - valor do cliente a ser buscado
   * @returns Observable<any>
   */
  getClientSalesResumida(type: string, value: string): Observable<any> {
    const endpoint = `${this.baseUrlSale}/client/summedUp/${type}/${value}`;
    return this.http.get<Sale>(endpoint).pipe(
      tap(data => {
        this.clientBuscaResumido = data;
      }),
      catchError(error => {
        console.log('Erro ao obter o cliente com as vendas', error);
        throw error;
      })
    );
  }

  //busca comanda pelo Id
  /** 
   * Obtém a comanda pelo numero do Id
   * @param id - numero da comanda 
   * @return sObservable <Command>
   */
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

  /**
  *faz o filtro dos produtos de acordo com oque esta no imput no component vendas <app-main>
  * @param termoBusca nome do produto
  */
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

  /**
  *pega os produtos do banco de dados e retorna eles separando por categoria 
  * @param categoria Observable<Product[]>
  */
  getProdutoPorCategoria(categoria: string): Observable<Product[]> {
    return this.getProdutos().pipe(
      map((produtos: Product[]) => produtos.filter(produto => produto.categoria === categoria))
    );
  }

   /** 
   * Obtém a categoria selecionada no component <main-app>
   * @return string com o nome da categoria.
   */
   getCategoriaSelecionadaTipo(): string  {
    return this.termoBuscaSubjectCategoia.value;
  }

  //seta o valor da categoria
   /** 
   * seta a categoria selecionada no component <app-category-list>
   * @return string com o nome da categoria.
   */
  setCategoriaSelecionadaTipo(tipo: string): void {
    this.termoBuscaSubjectCategoia.next(tipo);
  }

  //seta o type da busca
  /**
   * seta o tipo da busca no <app-search>
   * @param tipo 
   */
  setTypeSelected(tipo: string): void {
    this.termoBuscaSubjectType.next(tipo);
  }

 /**
  * atualiza o input de busca de produtos na aba vendas no component <app-search-product >
  * @param valor produto
  */
 atualizarValorInputVendas(valor: string) {
  this.termoBuscaSubject.next(valor)  
}


/**
  *atualiza o input de busca de client na aba buscar no component <app-search-product >
  * @param valor cliente
  */
atualizarValorInputBuscar(valor: any) {
  this.termoBuscaClientSubject.next(valor)  
}


  /**
  *Adiciona um novo produto ou incrementa a quantidade se já existir no component <app-products-box-right >
  * resumidamente quando eu cliclo em um produto e o mesmo ja esta no carrinho ele adiciona mais na quantidade do mesmo produto
  * caso nao exista esse produto no carrinho ele adiciona
  * @param produto 
  */
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
  
  //
 /**
  * atualiza a lista e remove o produto caso o input seja <= 0
  * e remove quando a venda foi comcluida
  * @param produto 
  */
  atualizarProdutos(produtos: any[]) {
    this.produtosSelecionadosSubject.next([...produtos]);  // Garante uma nova referência do array
  }

  /**
  * atualiza o valor do input
  * zera ele após a venda ser comcluida
  * @param command 
  */
  atualizaInputCommand (command:string){
    this.commandSelecionadoSubject.next(command);
  }
/**
 * funçoes de validação de login
 */
  
  // Método para fazer login
  loginService(username: string, password: string): Observable<boolean> {
    return this.getEmployee().pipe(
      map((employees: Employee[]) => {
        const loggedInEmployee = employees.find(employee => employee.userName === username && employee.password === password);

        if (loggedInEmployee) {
          this.employeeLog = loggedInEmployee;
          this.isAuthenticated = true;
          return true;
        } else {
          return false;
        }
      })
    );
  }

   // Obtém os funcionários e verifica se está autenticado
   getEmployeeAndCheckAuthentication(): Observable<boolean> {
    return this.getEmployee().pipe(
      map((employees: Employee[]) => {
        const loggedInEmployee = employees.find(employee => employee === this.employeeLog);
        this.isAuthenticated = !!loggedInEmployee;
        return this.isAuthenticated;
      })
    );
  }
  
   // Adicione a função para obter o funcionário logado
   getLoggedInEmployee(): Employee  {
    console.log(this.employeeLog)
    return this.employeeLog;
  }
  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
