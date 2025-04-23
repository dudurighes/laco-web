import {MatDialog} from '@angular/material/dialog';
import {finalize, Observable} from 'rxjs';
import {FormGroup, Validators, EmailValidator, ValidatorFn, AbstractControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {RequireMatch} from "../../../../../shared/validates/require-match";
import {CpfValidator} from "../../../../../shared/validates/cpf-validator";
import {SnackBarMessageService} from "../../../../../shared/components/snack-bar-message/snack-bar-message.service";
import {SessionService} from "../../../../../core/authentication/session.service";
import {SaveDenuncia} from "../../../../../shared/models/denuncia/denuncia.model";
import {TipoEntradaEnumModel} from "../../../../../shared/models/enuns/tipo-entrada-enum.model";
import {TipoEntradaService} from "../../../../../core/services/tipo-entrada/tipo-entrada.service";
import {StatusDenunciaEnumModel} from "../../../../../shared/models/enuns/status-denuncia-enum.model";
import {StatusDenunciaService} from "../../../../../core/services/status-denuncia/status-denuncia.service";
import {Endereco} from "../../../../../shared/models/endereco/endereco.model";
import {DenunciaService} from "../../../../../core/services/denuncia/denuncia.service";
import {TipoPessoaEnumModel} from "../../../../../shared/models/enuns/tipo-pessoa-enum.model";
import {TipoPessoaService} from "../../../../../core/services/tipo-pessoa/tipo-pessoa.service";
import {forkJoin} from 'rxjs';
import {MunicipioService} from "../../../../../core/services/municipio/municipio.service";
import {ApiCep, ApiCepDTO, Municipio} from "../../../../../shared/models/municipio/municipio.model";
import {LoginComponent} from "../../../../public/login/login.component";
import {Arquivo} from "../../../../../shared/models/arquivo/arquivo.model";

@Component({
  selector: 'app-denuncia-cadastro',
  templateUrl: './denuncia-cadastro.component.html',
  styleUrls: ['./denuncia-cadastro.component.scss']
})
export class DenunciaCadastroComponent implements OnInit {

  denunciaForm: FormGroup;

  submitted = false;

  checked: boolean = false;

  tipoEntradaList: TipoEntradaEnumModel[] = [];
  statusDenunciaList: StatusDenunciaEnumModel[] = [];
  tipoPessoaList: TipoPessoaEnumModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private sessionService: SessionService,
    private tipoEntradaService: TipoEntradaService,
    private statusDenunciaService: StatusDenunciaService,
    private tipoPessoaService: TipoPessoaService,
    private municipioService: MunicipioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private denunciaService: DenunciaService,
    private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    forkJoin({
      tipoEntrada: this.tipoEntradaService.getTipoEntradaEnumObservable(),
      statusDenuncia: this.statusDenunciaService.getStatusDenunciaEnumObservable(),
      tipoPessoa: this.tipoPessoaService.getTipoPessoaEnumObservable()
    }).subscribe(({tipoEntrada, statusDenuncia, tipoPessoa}) => {
      this.tipoEntradaList = tipoEntrada;
      this.statusDenunciaList = statusDenuncia;
      this.tipoPessoaList = tipoPessoa;
      this.denunciaForm = this.createForm();
    });
  }

  createForm() {

    return this.formBuilder.group({
      dataOcorrido: [new Date(), [Validators.required]],
      descricao: ['', [Validators.required]],
      tipoEntrada: ['', null],
      statusDenuncia: ['', null],
      tipoDenuncia: ['', [RequireMatch]],
      denunciaAnonima: [false, [RequireMatch]],

      tipoPessoaDenunciante: ['FISICA', [Validators.required]],
      identificacaoDenunciante: ['',],
      documentoDenunciante: ['',],
      emailDenunciante: ['',],
      telefoneDenunciante: ['',],

      tipoPessoaDenunciado: ['FISICA', [Validators.required]],
      identificacaoDenunciado: ['',],
      documentoDenunciado: ['',],
      emailDenunciado: ['',],
      telefoneDenunciado: ['',],

      cep: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      logradouro: ['', [Validators.required]],
      numero: ['',],
      bairro: ['',],
      complemento: [''],
      latitude: [''],
      longitude: [''],
      municipio: ['', [Validators.required, RequireMatch]],
      arquivoList: [[]],
    })
  }

  save(): void {


    this.submitted = true;

    let enderecoDenunciado: Endereco = {
      id: null,
      empresaId: null,
      bairro: this.denunciaForm.controls.bairro.value,
      cep: this.denunciaForm.controls.cep.value,
      complemento: this.denunciaForm.controls.complemento.value,
      logradouro: this.denunciaForm.controls.logradouro.value,
      municipio: this.denunciaForm.controls.municipio.value,
      latitude: this.denunciaForm.controls.latitude.value,
      longitude: this.denunciaForm.controls.longitude.value,
      numero: this.denunciaForm.controls.numero.value,
    }

    let saveDenuncia: SaveDenuncia = {
      id: null,
      dataOcorrido: this.denunciaForm.controls.dataOcorrido.value,
      descricao: this.denunciaForm.controls.descricao.value,
      protocolo: '',
      tipoEntrada: this.denunciaForm.controls.tipoEntrada.value,
      tipoDenuncia: this.denunciaForm.controls.tipoDenuncia.value,
      statusDenuncia: this.denunciaForm.controls.statusDenuncia.value,

      tipoPessoaDenunciante: this.denunciaForm.controls.tipoPessoaDenunciante.value,
      identificacaoDenunciante: this.denunciaForm.controls.identificacaoDenunciante.value,
      documentoDenunciante: this.denunciaForm.controls.documentoDenunciante.value,
      emailDenunciante: this.denunciaForm.controls.emailDenunciante.value,
      telefoneDenunciante: this.denunciaForm.controls.telefoneDenunciante.value,

      tipoPessoaDenunciado: this.denunciaForm.controls.tipoPessoaDenunciado.value,
      identificacaoDenunciado: this.denunciaForm.controls.identificacaoDenunciado.value,
      documentoDenunciado: this.denunciaForm.controls.documentoDenunciado.value,
      emailDenunciado: this.denunciaForm.controls.emailDenunciado.value,
      telefoneDenunciado: this.denunciaForm.controls.telefoneDenunciado.value,
      enderecoDenunciado: enderecoDenunciado,

      situacao: 'ATIVO',
      arquivoList: this.denunciaForm.controls.arquivoList.value
    }

    this.denunciaService.save(saveDenuncia)
      .pipe(finalize(() => {
        this.submitted = false;
      }))
      .subscribe({
        next: (v) => {
          this.messageService.openSnackBarSuccess("Cadastro efetuado com sucesso")
          this.cancel();
        },
        error: (e) => this.messageService.openSnackBarError(e.error.message),
        complete: () => console.info('complete')
      });
  }

  requiredMessage() {
    this.messageService.openSnackBarSuccess("Cadastro efetuado com sucesso");
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  findMunicipioByCep(): void {
    let apiCep: ApiCep;
    if (this.denunciaForm.controls.cep?.value) {
      this.municipioService.findMunicipioByViaCep(this.denunciaForm.controls.cep.value)
        .subscribe(
          (obs) => {
            apiCep = obs;
            this.municipioService.findByIbge(apiCep.ibgeId)
              .subscribe(sub => this.denunciaForm.controls.municipio.setValue(sub));

            this.denunciaForm.controls.logradouro.setValue(apiCep.street);
            this.denunciaForm.controls.complemento.setValue(apiCep.complement);
            this.denunciaForm.controls.logradouro.setValue(apiCep.street);

          }, error => {
            console.log("something is wrong");
          }
        );
    }
  }

  onSelectArquive(arquivos: Arquivo[]) {
    // Atualizar o controle 'arquivos' do formulário com os arquivos selecionados
    this.denunciaForm.get('arquivoList').setValue(arquivos);
  }

}
