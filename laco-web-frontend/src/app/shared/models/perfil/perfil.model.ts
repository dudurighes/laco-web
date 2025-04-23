export interface ListaPerfil {
  nome: string;

  id: number;

  roleId: string;

  roleName: string;
}

export interface PerfilDTO {
  id: number;

  nome: string;

  roleId: string;

  roleName: string;

  recursos: PerfilRecurso[];

}

export interface RegistraPerfil {
  nome: string;

  roleId: string;

  empresaId: number;

  recursos: PerfilRecurso[];
}

export interface AtualizarPerfil {

  id: number;

  nome: string;

  roleId: string;

  empresaId: number;

  recursos: PerfilRecurso[];

  recursosDeletados: PerfilRecurso[];

}

export class PerfilRecurso {

  id:number;

  descricao: string;

  registrar: boolean;

  listar: boolean;

  deletar: boolean;

  atualizar: boolean;

  imprimir: boolean;

  acessar: boolean;

  principal:boolean;

  recurso: any;

  perfil: PerfilDTO;

}


