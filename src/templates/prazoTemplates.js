const TYPES = require('../types');

/**
 * Templates relacionados a prazos
 */
module.exports = {
  [TYPES.PRAZO_PROXIMO]: {
    titulo: 'Prazo se aproximando',
    mensagem: 'O prazo para {descricao} está se aproximando. Data limite: {data_limite}.',
    processarDados: (dados) => ({
      ...dados,
      descricao: dados.descricao || 'a tarefa',
      data_limite: dados.data_limite ? (typeof dados.data_limite === 'string' ? dados.data_limite : new Date(dados.data_limite).toLocaleDateString('pt-BR')) : 'em breve',
      link: dados.link || null,
    }),
  },
  
  [TYPES.PRAZO_EXPIRADO]: {
    titulo: 'Prazo expirado',
    mensagem: 'O prazo para {descricao} expirou em {data_limite}.',
    processarDados: (dados) => ({
      ...dados,
      descricao: dados.descricao || 'a tarefa',
      data_limite: dados.data_limite ? (typeof dados.data_limite === 'string' ? dados.data_limite : new Date(dados.data_limite).toLocaleDateString('pt-BR')) : 'recentemente',
      link: dados.link || null,
    }),
  },
};