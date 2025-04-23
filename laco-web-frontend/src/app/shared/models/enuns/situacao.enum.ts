export interface Situacao {
  descricao: string;
  styleClass: string;
}

export const SituacaoEnum: { [key: string]: Situacao } = {
  ATIVO: { descricao: 'Ativo', styleClass: 'ativo-style' },
  INATIVO: { descricao: 'Inativo', styleClass: 'inativo-style' },
  EXCLUIDO: { descricao: 'Excluído', styleClass: 'excluido-style' }
};

export function mapSituacao(situacaoStr: string): Situacao {
  switch (situacaoStr) {
    case 'ATIVO':
      return SituacaoEnum.ATIVO;
    case 'INATIVO':
      return SituacaoEnum.INATIVO;
    case 'EXCLUIDO':
      return SituacaoEnum.EXCLUIDO;
    default:
      throw new Error(`Situacao desconhecida: ${situacaoStr}`);
  }
}
