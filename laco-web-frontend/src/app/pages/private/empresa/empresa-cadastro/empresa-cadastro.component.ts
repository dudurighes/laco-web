import {Location} from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, forkJoin, map, switchMap} from 'rxjs';
import {SnackBarMessageService} from 'src/app/shared/components/snack-bar-message/snack-bar-message.service';
import {Endereco} from 'src/app/shared/models/endereco/endereco.model';
import {CnpjValidator} from 'src/app/shared/validates/cnpj-validator';
import {RequireMatch} from 'src/app/shared/validates/require-match';
import {CpfValidator} from 'src/app/shared/validates/cpf-validator';
import {EmpresaService} from "../../../../core/services/empresa/empresa.service";
import {SaveEmpresa} from "../../../../shared/models/empresa/empresa.model";
import {TipoPessoaEnumModel} from "../../../../shared/models/enuns/tipo-pessoa-enum.model";
import {TipoPessoaService} from "../../../../core/services/tipo-pessoa/tipo-pessoa.service";
import {MunicipioService} from "../../../../core/services/municipio/municipio.service";
import {ApiCep} from "../../../../shared/models/municipio/municipio.model";
import {SessionService} from "../../../../core/authentication/session.service";
import {CnpjApiService} from "../../../../core/services/cnpj-api/cnpj-api.service";
import {Atividade, EmpresaResponse} from "../../../../shared/models/cnpj-api/cnpj-api.model";
import {NaturezaJuridicaService} from "../../../../core/services/naturezaJuridica/natureza-juridica.service";
import {AtividadeCnaeDTO} from "../../../../shared/models/cnae/atividade-cnae.model";
import {
  AutocompleteCnaeListComponent
} from "../../../../shared/components/inputs/autocomplete-atividade-cnae-list/autocomplete-cnae-list.component";
import {AtividadeCnaeService} from "../../../../core/services/cnae/atividade-cnae.service";
import {RepresentanteLegal} from "../../../../shared/models/representanteLegal/representanteLegal.model";

@Component({
  selector: 'app-empresa-cadastro',
  templateUrl: './empresa-cadastro.component.html',
  styleUrls: ['./empresa-cadastro.component.scss']
})
export class EmpresaCadastroComponent implements OnInit {

  tipoEmpresa: string;

  empresaForm: FormGroup;

  empresaId: number;

  submitted = false;

  vigilanciaCadastro = true;

  listaCnaes: AtividadeCnaeDTO[] = [];

  tipoPessoaList: TipoPessoaEnumModel[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: SnackBarMessageService,
    private empresaService: EmpresaService,
    private tipoPessoaService: TipoPessoaService,
    private municipioService: MunicipioService,
    private naturezaJuridicaService: NaturezaJuridicaService,
    private cnpjApiService: CnpjApiService,
    private atividadeCnaeService: AtividadeCnaeService,
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }


  ngOnInit(): void {

    this.empresaId = this.sessionService.empresa?.empresaId;

    this.vigilanciaCadastro = this.empresaId == null;

    forkJoin({
      tipoPessoa: this.tipoPessoaService.getTipoPessoaEnumObservable()
    }).subscribe(({tipoPessoa}) => {
      this.tipoPessoaList = tipoPessoa;
      this.empresaForm = this.createForm();

      this.empresaForm.get('tipoPessoa').valueChanges.subscribe(tipoPessoa => {
        this.updateValidations(tipoPessoa);
      });

      this.updateValidations(this.empresaForm.get('tipoPessoa').value);
    });


  }

  createForm() {
    this.empresaId;
    return this.formBuilder.group({
      tipoPessoa: ['JURIDICA', [Validators.required]],

      cnpj: ['', [Validators.required,]],
      cpf: ['', [Validators.required,]],
      nome: ['',],

      naturezaJuridica: ['', [Validators.required, RequireMatch]],
      cnaePrincipal: [undefined,],
      cnaesSecundarios: [[], []],
      representanteLegal: [[], []],
      inscricaoEstadual: ['',],
      inscricaoMunicipal: ['',],
      cnes: ['',],

      nomeEmpresarial: ['',],
      nomeFantasia: ['',],
      telefonePrincipal: ['', [Validators.required]],
      emailPrincipal: ['', [Validators.email, Validators.required]],
      telefones: [[], []],
      emails: [[], []],

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

  save() {

    this.submitted = true;

    let endereco: Endereco = {
      id: null,
      empresaId: null,
      bairro: this.empresaForm.controls.bairro.value,
      cep: this.empresaForm.controls.cep.value,
      complemento: this.empresaForm.controls.complemento.value,
      logradouro: this.empresaForm.controls.logradouro.value,
      municipio: this.empresaForm.controls.municipio.value,
      latitude: this.empresaForm.controls.latitude.value,
      longitude: this.empresaForm.controls.longitude.value,
      numero: this.empresaForm.controls.numero.value,
    }

    let empresa: SaveEmpresa = {
      tipoPessoa: this.empresaForm.controls.tipoPessoa.value,
      cnpj: this.empresaForm.controls.cnpj.value,
      cpf: this.empresaForm.controls.cpf.value,
      nome: this.empresaForm.controls.nome.value,
      cnes: this.empresaForm.controls.cnes.value,
      naturezaJuridica: !this.vigilanciaCadastro ? this.empresaForm.controls.naturezaJuridica.value : null,
      cnaePrincipal: !this.vigilanciaCadastro ? this.empresaForm.controls.cnaePrincipal.value : null,
      cnaesSecundarios: !this.vigilanciaCadastro ? this.empresaForm.controls.cnaesSecundarios.value : null,
      representanteLegalList: !this.vigilanciaCadastro ? this.empresaForm.controls.representanteLegal.value : null,
      inscricaoEstadual: !this.vigilanciaCadastro ? this.empresaForm.controls.inscricaoEstadual.value : null,
      inscricaoMunicipal: !this.vigilanciaCadastro ? this.empresaForm.controls.inscricaoMunicipal.value : null,

      nomeEmpresarial: this.empresaForm.controls.nomeEmpresarial.value,
      nomeFantasia: this.empresaForm.controls.nomeFantasia?.value,
      telefonePrincipal: this.empresaForm.controls.telefonePrincipal?.value,
      emailPrincipal: this.empresaForm.controls.emailPrincipal?.value,
      telefones: this.empresaForm.controls.telefones?.value,
      emails: this.empresaForm.controls.emails.value,

      tipoEmpresa: this.empresaId != null ? 'EMPRESA' : 'VIGILANCIA',
      cns: this.empresaForm.controls.cns?.value,
      endereco: endereco,
      logo: null,
      empresaPai: this.empresaId,
    };

    this.empresaService.save(empresa)
      .pipe(finalize(() => {
        this.submitted = false;
      }))
      .subscribe({
          next: () => {
            this.messageService.openSnackBarSuccess("Cadastro efetuado com sucesso")
            this.cancel();
          },
          error: (e) => this.messageService.openSnackBarError(e.error.message)
        }
      );
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  findMunicipioByCep(): void {
    let apiCep: ApiCep;
    if (this.empresaForm.controls.cep?.value) {
      this.municipioService.findMunicipioByViaCep(this.empresaForm.controls.cep.value)
        .subscribe({
            next: (nextCep) => {
              apiCep = nextCep;
              this.municipioService.findByIbge(apiCep.ibgeId)
                .subscribe(sub => this.empresaForm.controls.municipio.setValue(sub));
            },
            error: (e) => this.messageService.openSnackBarError(e.error.message),
            complete: () => console.info('complete')
          }
        );
    }
  }

  updateValidations(tipoPessoa: string) {
    const cnpj = this.empresaForm.get('cnpj');
    const cpf = this.empresaForm.get('cpf');
    const nome = this.empresaForm.get('nome');
    const nomeEmpresarial = this.empresaForm.get('nomeEmpresarial');
    const naturezaJuridica = this.empresaForm.get('naturezaJuridica');
    const cnaePrincipal = this.empresaForm.get('cnaePrincipal');

    if (tipoPessoa === 'JURIDICA') {
      if (!this.vigilanciaCadastro) {
        naturezaJuridica.setValidators([Validators.required, RequireMatch]);
        cnaePrincipal.setValidators([Validators.required, RequireMatch]);
      } else {
        naturezaJuridica.clearValidators();
        cnaePrincipal.clearValidators();
      }
      cnpj.setValidators([Validators.required, CnpjValidator()]);
      nomeEmpresarial.setValidators([Validators.required]);

      cpf.clearValidators();
      nome.clearValidators();
    } else if (tipoPessoa === 'FISICA') {
      cpf.setValidators([Validators.required, CpfValidator()]);
      nome.setValidators([Validators.required]);

      naturezaJuridica.clearValidators();
      cnaePrincipal.clearValidators();
      cnpj.clearValidators();
      nomeEmpresarial.clearValidators();
    }

    cnpj.updateValueAndValidity();
    cpf.updateValueAndValidity();
    nome.updateValueAndValidity();
    nomeEmpresarial.updateValueAndValidity();
  }

  buscarEmpresaPorCnpj(): void {
    const cnpj = this.empresaForm.get('cnpj')?.value;
    let empresaData: EmpresaResponse;
    if (cnpj) {
      this.cnpjApiService.findDataByCnpj(cnpj).subscribe({
        next: (nextData) => {
          empresaData = nextData;
          this.empresaForm.controls.nomeEmpresarial.setValue(empresaData.nome);
          this.empresaForm.controls.nomeFantasia.setValue(empresaData.fantasia);
          this.empresaForm.controls.telefonePrincipal.setValue(empresaData.telefone);
          this.empresaForm.controls.emailPrincipal.setValue(empresaData.email);

          this.empresaForm.controls.logradouro.setValue(empresaData.logradouro);
          this.empresaForm.controls.complemento.setValue(empresaData.complemento);
          this.empresaForm.controls.bairro.setValue(empresaData.bairro);

          const rawCep = this.removeCepMask(empresaData.cep);
          this.empresaForm.controls.cep.setValue(rawCep);
          this.findMunicipioByCep();

          this.empresaForm.controls.municipio.setValue(empresaData.municipio);
          this.empresaForm.controls.numero.setValue(empresaData.numero);
          if (empresaData.natureza_juridica) {
            const primeirosDigitos: string = empresaData.natureza_juridica.substring(0, 5);
            this.naturezaJuridicaService.findById(primeirosDigitos).subscribe({
              next: (nextData) => {
                this.empresaForm.controls.naturezaJuridica.setValue(nextData);
              }
            })
          }

          if (empresaData.atividade_principal) {
            const cnaePrincipal: Atividade[] = empresaData.atividade_principal
            const cnaePrincipalFormatado = cnaePrincipal.map(atividade => ({
              principal: true,
              numero: this.removerPontuacao(atividade.code),
              descricao: atividade.text
            }));
            if (cnaePrincipalFormatado[0].numero !== '0000000') {
              this.atividadeCnaeService.findById(cnaePrincipalFormatado[0].numero).subscribe((cnae) => {
                this.empresaForm.controls.cnaePrincipal.setValue(cnae);
              });
            }
          }

          if (empresaData.atividades_secundarias) {
            const atividadesPrincipais: Atividade[] = empresaData.atividades_secundarias
            const atividadesCnaeDTO$ = atividadesPrincipais
              .filter(atividade => this.removerPontuacao(atividade.code) !== "0000000")
              .map(atividade => ({
                principal: false,
                numero: this.removerPontuacao(atividade.code),
                descricao: atividade.text
              }));

            const observables = atividadesCnaeDTO$.map(dto =>
              this.atividadeCnaeService.findById(dto.numero).pipe(
                map((atividadeCnae: AtividadeCnaeDTO) => ({
                  ...dto, descricao: atividadeCnae.descricao // Atualizando a descrição com o retorno do DB
                }))
              )
            );

            forkJoin(observables).subscribe(updatedAtividadesCnaeDTO => {
              this.updateCnaes(updatedAtividadesCnaeDTO);
            });

          }
          this.messageService.openSnackBarSuccess("Dados carregados com sucesso! ");
        },
        error: (e) => {
          if (e.status === 429) {
            this.messageService.openSnackBarWarn("Muitas requisições. Por favor, tente novamente mais tarde.");
          } else if (e.status === 404) {
            this.messageService.openSnackBarWarn("CNPJ não encontrado. Verifique o número e tente novamente.");
          } else {
            this.messageService.openSnackBarError(e.error.message);
          }
        },
        complete: () => console.info('complete')
      })
    } else {
      this.messageService.openSnackBarWarn("Informe o cnpj pra buscar os dados");
    }
  }

  removeCepMask(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  updateCnaes(updatedList: AtividadeCnaeDTO[]): void {
    this.listaCnaes = updatedList;
    this.empresaForm.controls.cnaesSecundarios.setValue(updatedList);
    this.empresaForm.controls.cnaesSecundarios.markAsDirty();
    this.empresaForm.controls.cnaesSecundarios.updateValueAndValidity();
  }

  private removerPontuacao = (codigo: string): string => {
    return codigo.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
  };

}
