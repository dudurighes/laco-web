import { EmpresaAuth, Usuario } from "../user/user.model"

export interface AuthData {
    cpf: string
    password: string
    
}

export interface AuthResult {
    userData: Usuario
    empresaData:EmpresaAuth
    token: string
    loginAuth:boolean
}
