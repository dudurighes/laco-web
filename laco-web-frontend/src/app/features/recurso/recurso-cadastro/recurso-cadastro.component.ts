import { RegistraRecurso } from '../../../../shared/models/recurso/recurso.model';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoService } from '../../../../core/services/recurso/recurso.service';
import { SnackBarMessageService } from '../../../../shared/components/snack-bar-message/snack-bar-message.service';
import { FormBuilder } from '@angular/forms';
import {Component, computed, OnInit, signal} from '@angular/core';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-registrar-recurso',
  templateUrl: './recurso-cadastro.component.html',
  styleUrls: ['./recurso-cadastro.component.scss']
})
export class RecursoCadastroComponent implements OnInit {
  recursoForm: FormGroup;

  roles: string[] = []

  submitted = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private recursoService: RecursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recursoForm = this.formRecurso();
  }

  formRecurso() {
    return this.formBuilder.group({
      rota: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      icone: ['', [Validators.required]],
      uri:['',[Validators.required]],
      roles: [[], ],
      exibeMenu: [true, [Validators.required]],
      favorito: [false, [Validators.required]],
    });
  }

  registraRecurso() {

    if (this.roles.length === 0) {
      this.messageService.openSnackBarWarn("É necessário informar pelo menos um cargo pro recurso!");
      return;
    }

    this.submitted = true;

    let recurso: RegistraRecurso = {
      rota: this.recursoForm.controls.rota.value,
      descricao: this.recursoForm.controls.descricao.value,
      icone: this.recursoForm.controls.icone.value,
      roles: this.roles,
      uri: this.recursoForm.controls.uri.value,
      exibeMenu: this.recursoForm.controls.exibeMenu.value,
      favorito: this.recursoForm.controls.favorito.value,
    };

    this.recursoService.save(recurso)
    .pipe(finalize(() => { this.submitted = false; }))
    .subscribe(
      result => {
        this.messageService.openSnackBarSuccess('Perfil salvo com sucesso');
        this.cancel();
      },
      (err) => {
        this.messageService.openSnackBarError(err.error.message);
      }
    );
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
