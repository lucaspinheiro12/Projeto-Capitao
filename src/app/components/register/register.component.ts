import { Component } from '@angular/core';
import { alertFail, alertSuccess } from 'src/app/models/alerts';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
import { NgxMaskDirective} from 'ngx-mask' 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(private apiInsert:ApiInsertDeleteService){}

  protected contact:number | any;
  protected name:string | any;
  protected CPF:string | any;
  protected entry: number | any;
  protected idCommand:number | any;

  
  addClientCommand(contact: number, name: string, CPF: string, entry: number, idCommand: number) {
    //verifica se o CPF é valido
    if (this.isValidCPF(CPF)) {
      //verifica se type dos valores são numeros
      if(this.onlyOumbers(entry) && this.onlyOumbers(idCommand)){
        const clientCommand: any = {
          cpf: CPF,
          name: this.exchangeSpaceForBar(name),
          contact: contact,
          entry: entry,
          idCommand: idCommand
        };
    
        this.apiInsert.addClient(clientCommand).subscribe(result => {
          this.apiInsert.addCommand(clientCommand).subscribe(
            successResult => {
              this.contact = '';
              this.name = '';
              this.CPF = '';
              this.entry  = null;
              this.idCommand = null;
              alertSuccess('Sucesso!', 'Cliente cadastrado' )
            },
          );
        });
      }
    }else {
      alertFail('Erro!', 'CPF inválido' )
    }
  }
  
  private isValidCPF(cpf:string){
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return false
    soma = 0
    for (var i = 1; i <= 10; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true
  }

  //altera os espaos por barras para ter um padrão na hora de fazer buscas.
  private exchangeSpaceForBar(texto: string): string {
    // Substitui todos os espaços por '.'
    let textoComBarras = texto.replace(/ /g, '.');
    return textoComBarras.toLowerCase();
  }
  
  private onlyOumbers(value: any): boolean{
    return !isNaN(Number(value));
    }
}
