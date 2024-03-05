import { Component } from '@angular/core';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private apiInsert:ApiInsertDeleteService){}

  protected contact:number | any;
  protected name:string | any;
  protected CPF:string | any;
  protected entry:number | any;
  protected idCommand:number | any;

  
  addClientCommand(contact: number, name: string, CPF: string, entry: number, idCommand: number) {
    if (this.isValidCPF(CPF)) {
      const clientCommand: any = {
        cpf: CPF,
        name: name,
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
            this.entry = '';
            this.idCommand = '';
            Swal.fire({
              title: 'Sucesso!',
              text: 'Cliente cadastrado',
              icon: 'success',
            });
          },
        );
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'CPF inválido',
        icon: 'error',
      });
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
}
