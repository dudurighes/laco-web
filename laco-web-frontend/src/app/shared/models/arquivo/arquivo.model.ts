export interface Arquivo {
  id: number;
  dataCadastro: Date;
  nome: string;
  tipo: string;
  backup: string;
  urlAmazon: string;
  nomeOriginal: string;
}

export interface ListarCategoria {
    id: number;
    descricao: string
    enabled:boolean
}
