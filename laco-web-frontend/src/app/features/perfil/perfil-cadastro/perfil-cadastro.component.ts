import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/authentication/session.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {PerfilService} from "../../../../core/services/perfil/perfil.service";
import {PerfilRecurso, RegistraPerfil} from "../../../../shared/models/perfil/perfil.model";

@Component({
  selector: 'app-registrar-perfil',
  templateUrl: './perfil-cadastro.component.html',
  styleUrls: ['./perfil-cadastro.component.scss'],
})
export class PerfilCadastroComponent implements OnInit {

  perfilForm: FormGroup;

  dataSource: PerfilRecurso[];

  displayedColumns: string[] = ['descricao', 'registrar', 'deletar', 'atualizar', 'imprimir', 'acessar', 'principal'];

  submitted = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private perfilService: PerfilService,
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.perfilForm = this.formPerfil();

    if (!this.sessionService.isAdmin()) {
      this.findPerfilRecurso(this.sessionService.empresa.role);
    }


  }

  findPerfilRecurso(value: any) {

    this.perfilService.findPerfilRecursoNovo(value).subscribe(
      result => {
        this.dataSource = result;
      }
    )

  }

  formPerfil() {
    return this.formBuilder.group({
      nome: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
    });
  }


  get isAdmin() {
    return this.sessionService.isAdmin();
  }



  registraPerfil() {

    this.submitted = true;

    let countPrincipal = 0;

    this.dataSource.forEach(item => {
      if (item.principal) {
        countPrincipal += 1
      }
    });

    if(countPrincipal > 1){
      this.submitted = false;
      this.messageService.openSnackBarWarn("Só é possível selecionar um recurso como principal");
      return;
    }

    let perfil: RegistraPerfil = {
      nome: this.perfilForm.controls.nome.value,
      roleId: this.sessionService.isAdmin() ? this.perfilForm.controls.roleId.value : null,
      recursos: this.dataSource,
      empresaId: this.sessionService.isAdmin() ? null : this.sessionService.empresa.empresaId
    };

    this.perfilService.save(perfil)
      .pipe(finalize(() => { this.submitted = false; }))
      .subscribe(
        result => {
          this.messageService.openSnackBarSuccess('Perfil salvo com sucesso');
          this.cancel();
        },
        err => {
          this.messageService.openSnackBarError(err.error.message);
        }
      );
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
