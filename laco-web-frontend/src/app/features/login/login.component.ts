import { Component } from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SessionService } from 'src/app/core/authentication/session.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { AuthData } from 'src/app/shared/models/login/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  load = false;

  timeLeft: number = 60;

  reenviar = false;

  lockButtonSend = false;

  interval:  number ;

  formLogin : FormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router,
    private messageService: SnackBarMessageService) {

    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }


  login() {

    this.load = true;

    let authData: AuthData = {
      cpf: this.username.value,
      password: this.password.value,
    }

    this.trueLogin(authData);

  }


  private trueLogin(authData: AuthData) {
    this.userService.login(authData)
      .pipe(finalize(() => { this.load = false; }))
      .subscribe(result => {
        this.sessionService.authenticate(result)
        this.router.navigateByUrl("/private/home")
      },
        error => {
          this.load = false;
          this.messageService.openSnackBarError(error.error.message)
        })
  }


  get username() {
    return this.formLogin.controls.username
  }

  get password() {
    return this.formLogin.controls.password
  }

  get tokenAuth() {
    return this.formLogin?.controls?.tokenAuth
  }



  startTimer() {

    this.reenviar = true;

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.lockButtonSend = true;
      } else {
        this.reenviar = false;
        this.lockButtonSend = false;
        this.pauseTimer();
        this.timeLeft = 60;
      }
    }, 1000)
  }


  pauseTimer() {
    clearInterval(this.interval);
  }

}
