import {Endereco} from "../endereco/endereco.model";
import {Arquivo} from "../arquivo/arquivo.model";
import {Situacao} from "../enuns/situacao.enum";
import {SafeUrl} from "@angular/platform-browser";
import {RepresentanteLegal} from "../representanteLegal/representanteLegal.model";
import {NaturezaJuridica} from "../naturezaJuridica/natureza-juridica.model";
import {AtividadeCnaeDTO} from "../cnae/atividade-cnae.model";


export class ListaEmpresa {
  id: number
  cnpj: string
  cpf: string
  nomeEmpresarial: string
  nome: string
  nomeFantasia: string;
  tipoEmpresa: string;
  tipoPessoa: string;
  situacao: Situacao;
}

export interface ListaEmpresaPaginacao {
  size: number;
  list: ListaEmpresa[];
}

export class Token {

  token: string;

}

export interface SaveEmpresa {
  tipoPessoa: string;
  tipoEmpresa: string;

  cnpj: string;
  cpf: string;
  nome: string;
  cnes: string;
  cns: string;

  nomeEmpresarial: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;

  telefonePrincipal: string;
  emailPrincipal: string;

  telefones: string [];
  emails: string [];
  logo: Arquivo;

  endereco: Endereco;
  cnaePrincipal: AtividadeCnaeDTO;
  cnaesSecundarios: AtividadeCnaeDTO[];
  naturezaJuridica: NaturezaJuridica;
  representanteLegalList: RepresentanteLegal[];

  empresaPai: number;
}

export class ListaCustomEmpresaAcessos{

  vigilanciaList: ListaAcessoEmpresa[];

  empresaList: ListaAcessoEmpresa[];

}

export class ListaAcessoEmpresa{
  id: number
  tipoEmpresa: string;
  tipoPessoa: string;

  cnpj: string
  nomeEmpresarial: string
  nomeFantasia: string;

  cpf: string
  nome: string

  logo: string;
  safeLogo?: SafeUrl;
}
