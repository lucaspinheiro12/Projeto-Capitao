import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.serviceComands';
import { Cliente, Sale, SaleSummedUp } from 'src/app/models/modelos';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


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
  teste: Cliente| any;

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
      let ClientSemVenda: Observable<any>;
    
      // Escolha a lógica de busca com base nos checkboxes selecionados
      if (this.checkboxIdCommand) {
        detalhadoObservable = this.apiService.getClientSalesDetalhado('id', this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumida('id', this.valorInput);
        ClientSemVenda = this.apiService.getClientSemVendasId(this.valorInput);
      } else if (this.checkboxCPF) {
        detalhadoObservable = this.apiService.getClientSalesDetalhado('cpf', this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumida('cpf', this.valorInput);
        ClientSemVenda = this.apiService.getClientSemVendasCPFName('cpf', this.valorInput);
      } else if (this.checkboxName) {
        detalhadoObservable = this.apiService.getClientSalesDetalhado('name', this.valorInput);
        resumidoObservable = this.apiService.getClientSalesResumida('name', this.valorInput);
        ClientSemVenda = this.apiService.getClientSemVendasCPFName('name', this.valorInput);
      }
    
      // Realizar as chamadas apenas se o observable detalhado estiver definido
      if (detalhadoObservable) {
        detalhadoObservable.subscribe({
          next: (result) => {
            //se o cliente não tem venda ele entra nesse if
            if (result == '') {
              //retorna os dados do cliente sem vendas.
              ClientSemVenda.subscribe({
                next: (res) => {
                  console.log(res)
                  this.resultDetalhado = [{
                    commands: {
                      id: res.id,
                      client: {
                        name: res.client.name,
                        cpf: res.client.cpf,
                        contact: res.client.contact,
                      },
                      entry: res.entry,
                    },
                  }];
                  Swal.fire({
                    title: 'O cliente: ' + res.client.name,
                    text: 'Ainda não tem nenhum pedido',
                    icon: 'warning',
                  });
                },
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    //retorna os valores se o cliente tiver vendas 
      if (resumidoObservable) {
        resumidoObservable.subscribe({
          next: (result) => {
            this.resultadoResumido = result;
          },
          error: (err) => {
            console.log(err);
          },
        });
      } 
    }
    
     
}

