import {SecaoCnaeDTO} from "./secao-cnae.model";

export interface DivisaoCnaeDTO {
  id: string;
  descricao: string;
  observacoes: string[];
  secao: SecaoCnaeDTO;
}


