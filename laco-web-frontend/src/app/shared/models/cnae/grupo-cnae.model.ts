import {DivisaoCnaeDTO} from "./divisao-cnae.model";

export interface GrupoCnaeDTO {
  id: string;
  descricao: string;
  observacoes: string[];
  divisao: DivisaoCnaeDTO;
}
