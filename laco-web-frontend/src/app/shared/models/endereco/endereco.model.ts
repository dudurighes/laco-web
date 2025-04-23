import { Municipio } from "../municipio/municipio.model";

export interface Endereco {

  id: number;

  cep: string;

  logradouro: string;

  numero: string;

  bairro: string;

  complemento: string;

  latitude: string;

  longitude: string;

  empresaId: number;

  municipio: Municipio;

}
