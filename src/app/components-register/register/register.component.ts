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
  
   addClientCommand(contact:number, name:string, CPF:string, entry:number, idCommand:number){
    const clientCommand:any = {
      cpf:CPF,
      name:name,
      contact:contact,
      entry:entry,
      idCommand:idCommand
    };
    this.apiInsert.addClient(clientCommand).subscribe(  result => 
      this.apiInsert.addCommand(clientCommand).subscribe( result => console.log(result)))
  }
}
