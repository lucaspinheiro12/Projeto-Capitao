import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/modelos';
import { ApiService } from 'src/app/services/api.serviceComands';
import { ServiceCapture } from 'src/app/services/serviceCapture';

@Component({
  selector: 'app-search-command',
  templateUrl: './search-command.component.html',
  styleUrls: ['./search-command.component.css']
})
export class SearchCommandComponent implements OnInit {
  valorInput: number|any;
  constructor(private apiServer: ApiService) { }
  ngOnInit(): void {
    this.apiServer.commandSelecionado$.subscribe(command => {
      if(command === ''){
        this.commandEncontrado = '';
        this.valorInput = '';
      }
      console.log(command)
    })
  }

  commandEncontrado: Command | any; // Adicione essa propriedade para armazenar o cliente encontrado

  
  async pegaCommand(id:number) {
    console.log(id)
    try {
      this.commandEncontrado = await this.apiServer.getCommandById(id).toPromise();
    } catch (error) {
      console.error('Erro ao buscar comanda:', error);
    }
  }
}