import { Component } from '@angular/core';
import { ApiInsertDeleteService } from 'src/app/services/api.insert-delete.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private apiInsert:ApiInsertDeleteService){}

  contact:number | any;
  name:string | any;
  CPF:string | any;
  entry:number | any;
  idCommand:number | any;
  
  async addClientCommand(contact:number, name:string, CPF:string, entry:number, idCommand:number){
    console.log(contact)
    console.log(name)
    console.log(CPF)
    console.log(entry)
    console.log(idCommand)

    const teste:any = {
      cpf:CPF,
      name:name,
      contact:contact,
      entry:entry,
      idCommand:idCommand
    }
    await this.apiInsert.addClientCommand(teste)
   /* try {
      this.commandEncontrado = await this.apiServer.getCommandById(id).toPromise();
    } catch (error) {
      console.error('Erro ao buscar comanda:', error);
    }*/
  }
}
