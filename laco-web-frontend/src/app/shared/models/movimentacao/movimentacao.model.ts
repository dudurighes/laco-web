import { ListaEmpresa } from "src/app/shared/models/empresa/empresa.model"
import { ListarCategoria } from "../categoria/categoria.model"
import { ListarCentroCusto } from "../centro-custo/centroCusto.model"
import { ListarContas } from "../contas/contas.model"
import { ListarUsuario } from "../user/user.model"

export interface RegistrarMovimentacao {
    empresa: {
        id: number,
    },
    usuario: {
        id: number,
    },
    contas: {
        id: number,
    },
    categoria : {
        id : number,
    },
    centroCusto :{
        id : number,
    },
    valor: number,
    tipoMovimentacao: string,
    status: string,
    dataMovimentacao : Date,
    descricao: string
}

export interface ListarMovimentacao {
    id: number;
    empresa: ListaEmpresa,
    usuario: ListarUsuario,
    contas:  ListarContas,
    categoria: ListarCategoria,
    codigoReferencia : string,
    dataCadastro : string,
    centroCusto: ListarCentroCusto,
    valor: number,
    tipoMovimentacao: string,
    status: string,
    dataMovimentacao : Date,
    descricao: string
}
