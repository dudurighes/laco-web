import {Component} from '@angular/core';
import {DefaultLoginLayoutComponent} from '../../components/login/default-login-layout/default-login-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputFieldComponent} from '../../shared/input-field/input-field.component';
import {MatButton} from '@angular/material/button';
import {UserLogin} from '../../components/login/default-login-layout/user-login';

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

}
