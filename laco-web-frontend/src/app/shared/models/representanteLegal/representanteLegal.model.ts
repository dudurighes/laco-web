import {OrgaoEmissor} from "../orgaoEmissor/orgao-emissor.model";

export interface RepresentanteLegal {

  id: number;

  nome: string;

  cpf: string;

  rg: string;

  dataEmissao: string;

  orgaoEmissor: OrgaoEmissor

  empresaId: number;

}
