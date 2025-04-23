import {GrupoCnaeDTO} from "./grupo-cnae.model";

export interface ClasseCnaeDTO {
  id: string;
  descricao: string;
  observacoes: string[];
  grupo: GrupoCnaeDTO;
}
