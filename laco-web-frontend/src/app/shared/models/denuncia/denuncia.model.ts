import {ListaEmpresa} from "../empresa/empresa.model";
import {Situacao} from "../enuns/situacao.enum";
import {Arquivo} from "../arquivo/arquivo.model";
import {Endereco} from "../endereco/endereco.model";

export interface Denuncia {
  id: number;
  dataOcorrido: Date; // Use string for ISO date format
  descricao: string;
  dadosDenunciante: string;
  protocolo: string;
  tipoEntrada: string;
  statusDenuncia: string;
  tipoDenuncia: TipoDenuncia;
  situacao: Situacao;
  empresa: ListaEmpresa;
}

export interface SaveDenunciaArquivo {
  id: number;
  denuncia: Denuncia;
  arquivo: Arquivo;
}

export interface DenunciaArquivo {
  id: number;
  denuncia: Denuncia;
  arquivo: Arquivo;
}

export interface SaveDenuncia {
  id: number;
  dataOcorrido: Date;
  descricao: string;
  protocolo: string;
  tipoEntrada: string;
  statusDenuncia: string;
  tipoDenuncia: string;
  situacao: string;

  tipoPessoaDenunciante: string;
  identificacaoDenunciante: string;
  documentoDenunciante: string;
  emailDenunciante: string;
  telefoneDenunciante: string;

  tipoPessoaDenunciado: string;
  identificacaoDenunciado: string;
  documentoDenunciado: string;
  emailDenunciado: string;
  telefoneDenunciado: string;
  enderecoDenunciado: Endereco;

  arquivoList: Arquivo [];
}

export interface PaginaDenuncia{
  size: number;
  denunciaDTOList: Denuncia[];
}

export interface TipoDenuncia {
  id: number;
  descricao: string;
  situacao: Situacao;
}

export interface SaveTipoDenuncia {
  id: number;
  descricao: string;
  situacao: string;
}



