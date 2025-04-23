import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackBarMessageService } from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import {SituacaoEnum} from "../../../../../shared/models/enuns/situacao.enum";
import {SaveTipoDenuncia, TipoDenuncia} from "../../../../../shared/models/denuncia/denuncia.model";
import {TipoDenunciaService} from "../../../../../core/services/tipo-denuncia/tipo-denuncia.service";

@Component({
  selector: 'app-tipo-denuncia-cadastro',
  templateUrl: './tipo-denuncia-cadastro.component.html',
  styleUrls: ['./tipo-denuncia-cadastro.component.scss']
})
export class TipoDenunciaCadastroComponent implements OnInit {

  tipoDenunciaForm: FormGroup;

  existeTipo: boolean = false;

  submitted = false;

  pessoaFisica: boolean = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private tipoDenunciaService: TipoDenunciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tipoDenunciaForm = this.createFormTipoDenuncia();
  }

  createFormTipoDenuncia() {
    return this.formBuilder.group({
      descricao: ['', [Validators.required,]],
    });
  }

  save() {
    
    let tipoDenuncia: SaveTipoDenuncia = {
      id: null,
      descricao:  this.tipoDenunciaForm.controls.descricao.value,
      situacao: 'ATIVO'
    }

    this.tipoDenunciaService.save(tipoDenuncia)
      .pipe(finalize(() => { this.submitted = false; }))
      .subscribe(
        () => {
          this.messageService.openSnackBarSuccess("Cadastro efetuado com sucesso")
          this.cancel();
        },
        err => {
          this.messageService.openSnackBarError(err.error.message)
        }
      );
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}
