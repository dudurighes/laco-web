export interface ListaRecurso{
  id: number;

  rota: string;

  descricao: string;

  icone: string;

  roles: string[];

  uri: string;

  exibeMenu: boolean;

}

export interface RegistraRecurso {
  rota: string;

  descricao: string;

  icone: string;

  roles: string[];

  uri: string;

  exibeMenu: boolean;

  favorito: boolean;

}

export interface AtualizarRecurso {
  id: number;

  rota: string;

  descricao: string;

  icone: string;

  roles: string[];

  uri: string;

  exibeMenu: boolean;

  favorito: boolean;
}
