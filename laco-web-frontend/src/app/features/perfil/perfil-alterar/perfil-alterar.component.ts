import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/authentication/session.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import {PerfilService} from "../../../../core/services/perfil/perfil.service";
import {SnackBarMessageService} from "../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {AtualizarPerfil, PerfilRecurso} from "../../../../shared/models/perfil/perfil.model";

@Component({
  selector: 'app-atualizar-perfil',
  templateUrl: './perfil-alterar.component.html',
  styleUrls: ['./perfil-alterar.component.scss'],
})
export class PerfilAlterarComponent implements OnInit {
  perfilForm: FormGroup;

  perfil: AtualizarPerfil;

  perfilId: number;

  dataSource: PerfilRecurso[];

  dataSourceInicial: PerfilRecurso[];

  recursosDeletados: PerfilRecurso[];

  submitted = false;

  displayedColumns: string[] = ['descricao', 'registrar', 'deletar', 'atualizar', 'imprimir', 'acessar','principal'];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private perfilService: PerfilService,
    private location:Location,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.perfilId = this.route.snapshot.params['perfilId'];

    this.perfilService.findById(this.perfilId).subscribe(
      result => {
        this.perfil = result;
        this.dataSource = this.perfil.recursos;
        this.dataSourceInicial = this.perfil.recursos;
        this.perfilForm = this.formPerfil();
        this.buscaNovosRecursos();
      },
      err => {
        this.messageService.openSnackBarError(err.erro.message);
      }
    )
  }

  formPerfil() {
    return this.formBuilder.group({
      nome: [this.perfil?.nome, [Validators.required]],
      roleId: [this.perfil?.roleId, [Validators.required]],
    });
  }


  get isAdmin() {
    return this.sessionService.isAdmin();
  }

  buscaNovosRecursos() {


    this.perfilService.buscaRecursosNaoSalvos(this.perfil.id).subscribe(
      result => {
        if (result != null && result.length > 0) {
          this.dataSourceInicial = [...this.dataSourceInicial, ...result];
          this.dataSource = this.dataSourceInicial;
        }
      }
    )


  }

  atualizaPerfil() {
    this.submitted = true;
    if (!this.sessionService.isAdmin() && this.sessionService.empresa == null) {
      this.messageService.openSnackBarError(
        'Algo inesperado aconteceu, por favor tente novamente ou contate o suporte'
      );
    }


    var countPrincipal = 0;

    this.dataSource.forEach(item => {
      if (item.principal) {
        countPrincipal += 1
      }
    });

    if(countPrincipal > 1){
      this.submitted = false
      this.messageService.openSnackBarWarn("Só é possível selecionar um recurso como principal");
      return;
    }

    let perfil: AtualizarPerfil = {
      id: this.perfil.id,
      nome: this.perfilForm.controls.nome.value,
      roleId: this.perfilForm.controls.roleId.value,
      recursos: this.dataSource,
      recursosDeletados: this.recursosDeletados,
      empresaId: this.sessionService.isAdmin() ? null : this.sessionService.empresa.empresaId
    };

    this.perfilService.update(perfil)
    .pipe(finalize(() => { this.submitted = false; }))
    .subscribe(
      (result) => {
        this.messageService.openSnackBarSuccess(
          'Perfil atualizado com sucesso!'
        );
        this.cancel();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

  findPerfilRecurso(event: any) {
    if (this.perfil.roleId === event.value) {
      this.dataSource = this.dataSourceInicial;
      return;
    }

    this.perfilService.findPerfilRecursoNovo(event.value).subscribe(
      result => {
        this.dataSource = result;

      }
    )
  }

  cancel() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }
}
