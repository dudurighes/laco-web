import {ClasseCnaeDTO} from "./classe-cnae.model";

export interface SubclasseCnaeDTO {
  id: string;
  descricao: string;
  observacoes: string[];
  atividades: string[];
  classe: ClasseCnaeDTO;
}

