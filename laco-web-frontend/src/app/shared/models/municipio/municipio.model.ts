export interface Municipio {

  id: number;
  nome: string;
  ibge: string;
  estado: string;
  estadoSigla: string;

}

export interface ApiCepDTO {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface ApiCep {
  street: string;
  complement: string;
  district: string;
  districtId: string;
  city: string;
  cityId: string;
  ibgeId: string;
  state: string;
  stateIbgeId: string | null;
  stateShortname: string;
  zipcode: string;
}
