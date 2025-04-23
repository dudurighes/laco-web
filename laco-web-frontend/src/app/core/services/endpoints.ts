import { environment } from "src/environments/environment";

const URL_BASE = environment.BASE_URL


//declare var window: any;

//const URL_BASE = window.config.api


export const WS_LOGIN = URL_BASE + "/login"

export const WS_USER = URL_BASE + "/usuario"

export const WS_DOCUMENTACAO = URL_BASE + "/documentacao"

export const WS_NATUREZA_JURIDICA = URL_BASE + "/naturezaJuridica"

export const WS_ORGAO_EMISSOR = URL_BASE + "/orgaoEmissor"

export const WS_MUNICIPIO = URL_BASE + "/municipio"

export const WS_EMPRESA= URL_BASE + "/empresa"

export const WS_PERFIL= URL_BASE + "/perfil"

export const WS_RECURSO= URL_BASE + "/recurso"

export const WS_VIGILANCIA_ACESSO= URL_BASE + "/acesso-vigilancia"

export const WS_EMPRESA_ACESSO= URL_BASE + "/acesso-empresa"

export const WS_DENUNCIA = URL_BASE + "/denuncia"

export const WS_TIPO_DENUNCIA = URL_BASE + "/tipo-denuncia"

export const WS_VIA_CEP = "https://viacep.com.br/ws/"

export const WS_API_BRASIL = "https://api.brasilaberto.com/v1/zipcode/"

export const WS_CNAE_IMPORT = "https://servicodados.ibge.gov.br/api/v2/cnae/"

export const WS_CNAE_SECAO = URL_BASE + "/cnae/secao"
export const WS_CNAE_DIVISAO = URL_BASE + "/cnae/divisao"
export const WS_CNAE_GRUPO = URL_BASE + "/cnae/grupo"
export const WS_CNAE_CLASSE = URL_BASE + "/cnae/classe"
export const WS_CNAE_SUBCLASSE = URL_BASE + "/cnae/subclasse"

export const WS_ATIVIDADE_CNAE = URL_BASE + "/atividadeCnae"

export const WS_CNPJ_TOKEN_GOV = "https://h-apigateway.conectagov.estaleiro.serpro.gov.br/oauth2/jwt-token"
export const WS_CNPJ_API_GOV = "https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cnpj-empresa/v2/empresa/"

export const WS_CNPJ_API = URL_BASE + "/cnpj-api/cnpj/"
