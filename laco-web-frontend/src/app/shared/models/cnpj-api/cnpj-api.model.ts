export interface Atividade {
  code: string;
  text: string;
}

export interface EmpresaResponse {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string | null; // Pode ser null
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  data_situacao: string | null; // Pode ser null
  motivo_situacao: string | null; // Pode ser null
  cnpj: string;
  ultimaAtualizacao: string | null; // Pode ser null
  status: string;
  complemento: string;
  email: string;
  telefone: string;
  efr: string;
  situacaoEspecial: string | null; // Pode ser null
  dataSituacaoEspecial: string | null; // Pode ser null
  atividade_principal: Atividade[] | null; // Pode ser null
  atividades_secundarias: Atividade[] | null; // Pode ser null
  capitalSocial: string | null; // Pode ser null
}
