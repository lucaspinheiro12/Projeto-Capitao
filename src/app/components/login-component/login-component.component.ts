import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.serviceComands';

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
    console.log('aqui')
    console.log(user.toString)
    if (this.apiService.loginService(this.username, this.password)) {
      this.router.navigate(['/register']);
    } else {
      this.errorMessage = 'Login ou senha incorretos';
    }
  }
}


