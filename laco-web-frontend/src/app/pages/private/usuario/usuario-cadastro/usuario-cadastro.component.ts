import { Location } from '@angular/common';
import { CpfValidator } from 'src/app/shared/validates/cpf-validator';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegistrarUsuario } from 'src/app/shared/models/user/user.model';
import { RequireMatch } from 'src/app/shared/validates/require-match';
import {SessionService} from "../../../../core/authentication/session.service";

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.scss']
})
export class UsuarioCadastroComponent implements OnInit {

  usuarioForm: FormGroup;

  empresaLogadaId: number;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private userService: UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.empresaLogadaId = this.sessionService.empresa?.empresaId;
    this.usuarioForm = this.formUsuario();
  }

  formUsuario() {
    return this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['',[Validators.required, CpfValidator()]],
      telefone: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
      perfil: [undefined, this.empresaLogadaId != undefined ? [Validators.required,RequireMatch] : ''],
    });
  }

  registraUsuario() {

    this.submitted = true;

    let usuario: RegistrarUsuario = {
      nome: this.usuarioForm.controls.nome.value,
      cpf: this.usuarioForm.controls.cpf.value,
      telefone: this.usuarioForm.controls.telefone.value,
      email: this.usuarioForm.controls.email.value,
      password: this.usuarioForm.controls.password.value,
      perfil: this.usuarioForm.controls.perfil.value,
    };

    this.userService.save(usuario)
    .pipe(finalize(() => { this.submitted = false; }))
    .subscribe(
      result => {

        this.messageService.openSnackBarSuccess('Usuario salvo com sucesso');
        this.back();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );

  }

  get isAdmin(){
    return this.sessionService.isAdmin();
  }

  back(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
