import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.apiService.loginService(username, password).subscribe(
        (loginSuccessful: boolean) => {
          if (loginSuccessful) {
            this.router.navigate(['/register']);
            this.showSuccessMessage(username);
          } else {
            this.showErrorMessage('Usuário ou senha inválida');
          }
        },
        (error) => {
          console.error('Erro no login:', error);
          this.showErrorMessage('Erro no login');
        }
      );
    }
  }

  private showSuccessMessage(username: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${username} Bem vindo à comanda Online`,
      showConfirmButton: false,
      timer: 2000
    });
  }

  private showErrorMessage(message: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
}



