import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import { RecursoService } from '../../../../core/services/recurso/recurso.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtualizarRecurso } from '../../../../shared/models/recurso/recurso.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-atualizar-recurso',
  templateUrl: './recurso-alterar.component.html',
  styleUrls: ['./recurso-alterar.component.scss'],
})
export class RecursoAlterarComponent implements OnInit {
  recursoForm: FormGroup;

  recurso: AtualizarRecurso;

  recursoId: number;

  roles: string[] = []

  submitted = false;

  displayedColumns: string[] = ['rota','descricao','icone','roles','uri'];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private recursoService: RecursoService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.recursoId = this.activatedRoute.snapshot.params['recursoId'];

    this.recursoService.findById(this.recursoId).subscribe(
      result => {
        this.recurso = result;
        this.roles = this.recurso.roles
        this.recursoForm = this.formRecurso();
      }
    )
  }

    formRecurso() {
      return this.formBuilder.group({
        rota: [this.recurso?.rota, [Validators.required]],
        descricao: [this.recurso?.descricao, [Validators.required]],
        icone: [this.recurso?.icone, [Validators.required]],
        roles: [this.recurso?.roles],
        uri: [this.recurso?.uri, [Validators.required]],
        exibeMenu: [this.recurso?.exibeMenu, ],
        favorito: [this.recurso?.favorito, ],
      })
    }

    atualizaRecurso() {
      this.submitted = true;

      let recurso: AtualizarRecurso = {
        id: this.recurso.id,
        rota: this.recursoForm.controls.rota.value,
        descricao: this.recursoForm.controls.descricao.value,
        icone: this.recursoForm.controls.icone.value,
        roles: this.roles,
        uri: this.recursoForm.controls.uri.value,
        exibeMenu: this.recursoForm.controls.exibeMenu.value,
        favorito: this.recursoForm.controls.favorito.value,
      }
      this.recursoService.update(recurso)
      .pipe(finalize(() => { this.submitted = false; }))
      .subscribe(
        (result) => {
          this.messageService.openSnackBarSuccess(
            'Recurso atualizado com sucesso!'
          );
          this.cancel();
        },
        (err) => {
          this.messageService.openSnackBarError(err.error.message);
        }
      );
    }

    cancel() {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    }

    addList(any){

      var item = any.value;

      if (this.roles.indexOf(item) > -1) {

        this.messageService.openSnackBarWarn("Cargo já adicionado")

      }else{
        this.roles.push(item)

      }


      this.recursoForm.get('roles').reset()

    }

    remove(item:string){

      var index = this.roles.indexOf(item);

      this.roles.splice(index, 1);

    }
}
