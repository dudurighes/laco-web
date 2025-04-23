import {PerfilDTO} from "../perfil/perfil.model";

export interface Usuario {
  id: number
  cpf: string
  name: string
  emailConfirmado:boolean
  role: string
  phone:string
}

export interface ConfirmaUsuario{
  confirmado: boolean;
  email: string;
  id: number;
}

export interface EmpresaAuth {
  empresaId: number
  nome: string
  perfilId: string
  role: string
}



export interface RegistrarUsuario {
  nome: string
  cpf: string
  telefone: string
  email: string
  password: string
  perfil: PerfilDTO
}

export interface AtualizarUsuario{
  id:number
  nome: string
  cpf: string
  telefone: string
  email: string
  perfil: PerfilDTO
  usuarioCadastro: number
  telefoneConfirmado: boolean
  confirmado: boolean
}

export interface AtualizarUsuarioMeuPerfil{
  id:number
  password: string,
  nome: string
  telefone: string
  email: string
  cpf: string
  telefoneConfirmado: boolean
  confirmado: boolean
}

export interface ListarUsuario{
  id: number
  nome: string
  cpf: string
  email: string
  perfil: PerfilDTO
  isInvisivel: boolean
}

export interface TokenResult {
  exp: number;
  user: UserAuth;
  empresa:EmpresaAuth;
}

export interface UserAuth{
  empresaId:number
}


