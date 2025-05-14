import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/login/default-login-layout/default-login-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../shared/input-field/input-field.component';
import {UserRegister} from './user-register';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    DefaultLoginLayoutComponent,
    FormsModule,
    InputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: UserRegister = {
    nome: "",
    login: "",
    senha: ""
  }

  constructor(private userService: UserService, private router: Router) {
  }

  onRegister(): void {
    this.userService.registerUser(this.user).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
      }
    });
  }

  onBackToLogin(): void {
    this.router.navigate(['/login']);
  }
}
