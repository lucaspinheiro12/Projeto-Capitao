import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alertTimerSuccess, aletTimerErro } from 'src/app/models/alerts';
import { ApiService } from 'src/app/services/api.serviceComands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
<<<<<<< HEAD
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
=======
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.apiService.loginService(username, password).subscribe(
        (loginSuccessful: boolean) => {
          if (loginSuccessful) {
            this.router.navigate(['/register']);
            alertTimerSuccess(`${username} Bem vindo à comanda Online`, 1500);
          } else {
            aletTimerErro('Usuário ou senha inválida', 1500);
          }
        },
        (error) => {
          aletTimerErro('Erro no login: ' + error, 1500);
        }
      );
>>>>>>> develop
    }
  }
}



