import { Component } from '@angular/core';
import { ServiceCapture } from 'src/app/services/serviceCapture';

@Component({
  selector: 'app-search-command',
  templateUrl: './search-command.component.html',
  styleUrls: ['./search-command.component.css']
})
export class SearchCommandComponent {
  valorInput: number = 0;
  constructor(private serviceCapture: ServiceCapture) { }

  clienteEncontrado: any; // Adicione essa propriedade para armazenar o cliente encontrado

  pegaCliente() {
    // Chame o serviço para obter o cliente por comanda
    this.serviceCapture.getClientes().map(
      (cliente) => {
        if (cliente.comanda == this.valorInput) {
          this.clienteEncontrado = cliente;
          this.serviceCapture.setClienteAtual(this.clienteEncontrado);
        } else {
          console.log('Cliente nao encontrado');
        }
      });
  }
}