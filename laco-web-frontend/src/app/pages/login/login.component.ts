import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/login/default-login-layout/default-login-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../shared/input-field/input-field.component';
import {MatButton} from '@angular/material/button';
import {UserLogin} from '../../components/login/default-login-layout/user-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    FormsModule,
    InputFieldComponent,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: UserLogin = {
    email: "",
    password: ""
  }

  constructor(private router: Router) {}

  onLogin(): void {
    // Login logic would go here
    console.log('Login attempt with:', this.user);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}
