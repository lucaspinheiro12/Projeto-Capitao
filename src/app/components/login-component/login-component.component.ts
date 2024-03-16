import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.serviceComands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})


export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(): void {
    const user : string = this.username;
    if (this.apiService.loginService(this.username, this.password)) {
      this.router.navigate(['/register']);
      console.log(this.username)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: this.username + ' Bem vindo à comanda Online',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Usuario ou senha invalida",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}



