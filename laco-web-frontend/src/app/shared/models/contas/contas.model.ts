export interface RegistrarContas {
    empresa?: {
        id: number
    },
    agencia: string
    conta:string
    chave:string
    descricao: string
}
  
export interface ListarContas {
    id: number;
    agencia: string
    conta:string
    chave:string
    descricao: string
}
  