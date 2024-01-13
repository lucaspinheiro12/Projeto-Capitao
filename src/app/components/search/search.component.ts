import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.serviceComands';
import { Sale, SaleSummedUp } from 'src/app/models/modelos';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(private apiService: ApiService){}
    ngOnInit(): void {
      this.apiService.termoClientBusca$.subscribe(novoValor => {
        this.valorInput = novoValor;
      });    
    }

    checkboxCPF: boolean = true;
    checkboxName: boolean = false;
  checkboxIdCommand: boolean = false;
  selectedItem: string = 'resumido';
  mostrarPedidoResumido: boolean = true;
  mostrarPedidoDetalhado: boolean = false;
  valorInput:number |any;
  resultDetalhado: Sale | any;
  resultadoResumido:SaleSummedUp | any;

    updateCheckboxes(checkboxNumber: number): void {
        // Desmarca todos os checkboxes
        this.checkboxCPF = false;
        this.checkboxName= false;
        this.checkboxIdCommand = false;
        // Marca apenas o checkbox clicado
        if (checkboxNumber === 1) {
        this.checkboxCPF = true;
        } else if (checkboxNumber === 2) {
        this.checkboxName = true;
        } else if (checkboxNumber === 3) {
        this.checkboxIdCommand = true;
        }
    }

    selectType(nomeCategoria: string) {
        this.selectedItem = nomeCategoria;
        this.apiService.setTypeSelected(this.selectedItem);
    }
  
    isSelectedType(item: string): boolean {
        return this.selectedItem === item;
    }
    showPedidoResumido(): void {
        this.mostrarPedidoResumido = true;
        this.mostrarPedidoDetalhado = false;
    }

    showPedidoDetalhado(): void {
        this.mostrarPedidoResumido = false;
        this.mostrarPedidoDetalhado = true;
    }

    buscarDados(): void {
      let detalhadoObservable;
      let resumidoObservable;
    
      // Escolha a lógica de busca com base nos checkboxes selecionados
      if (this.checkboxIdCommand) {
        detalhadoObservable = this.apiService.getClientSalesDetalhadoId(this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumidoId(this.valorInput);
      } else if (this.checkboxCPF) {
        detalhadoObservable = this.apiService.getClientSalesDetalhadoCpf(this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumidoCPF(this.valorInput);
        console.log(typeof this.valorInput)
      } else if (this.checkboxName) {
        detalhadoObservable = this.apiService.getClientSalesDetalhadoName(this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumidoName(this.valorInput);
        console.log(typeof this.valorInput)
      }      
    
      // Realizar as chamadas apenas se o observable detalhado estiver definido
      if (detalhadoObservable) {
        detalhadoObservable.subscribe(
          {
            next: (result) => {
              if(result ==  ''){
                console.log("vazio porra")
                //aqui tenho que colocar uma logica que vai pegar os dados dos clientes que não tem vendas
                //acho melhor criar um metodo parecido com este que pega o valor e faz um get no client ou commanda pegando o valor.
              }
              this.resultDetalhado = result;
              console.log(result)
            },
            error: (err) => {
              console.log(err);
            }
          }
        );
        
      }
      if(resumidoObservable){
        resumidoObservable.subscribe(
          {
            next: (result) => {
              this.resultadoResumido = result;
            },
            error: (err) => {
              console.log(err);
            }
          }
        );
      }
      console.log(this.resultDetalhado)
    }
      
}

