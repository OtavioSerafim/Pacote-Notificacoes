const TYPES = require('../types');

/**
 * Templates relacionados a ações do sistema
 */
module.exports = {
  [TYPES.ACAO_CONCLUIDA]: {
    titulo: '{tipo_acao} concluída',
    mensagem: 'A {tipo_acao} foi concluída com sucesso: {descricao}',
    processarDados: (dados) => ({
      ...dados,
      tipo_acao: dados.tipo_acao || 'Ação',
      descricao: dados.descricao || 'Sem descrição adicional',
      link: dados.link || null,
    }),
  },
  
  [TYPES.ACAO_PENDENTE]: {
    titulo: '{tipo_acao} pendente',
    mensagem: 'Existe uma {tipo_acao} pendente que precisa da sua atenção: {descricao}',
    processarDados: (dados) => ({
      ...dados,
      tipo_acao: dados.tipo_acao || 'Ação',
      descricao: dados.descricao || 'Sem descrição adicional',
      link: dados.link || null,
    }),
  },
  
  [TYPES.ACAO_REJEITADA]: {
    titulo: '{tipo_acao} não aprovada',
    mensagem: 'A {tipo_acao} não foi aprovada. Motivo: {motivo}',
    processarDados: (dados) => ({
      ...dados,
      tipo_acao: dados.tipo_acao || 'Ação',
      motivo: dados.motivo || 'Motivo não especificado',
      link: dados.link || null,
    }),
  },
};