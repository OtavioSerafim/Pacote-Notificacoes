const TYPES = require('../types');

/**
 * Templates relacionados a eventos
 */
module.exports = {
  [TYPES.EVENTO_CRIADO]: {
    titulo: 'Novo evento: {titulo_evento}',
    mensagem: 'Um novo evento foi criado: {titulo_evento}. Data: {data_evento}',
    processarDados: (dados) => ({
      ...dados,
      titulo_evento: dados.titulo_evento || 'Sem título',
      data_evento: dados.data_evento ? (typeof dados.data_evento === 'string' ? dados.data_evento : new Date(dados.data_evento).toLocaleDateString('pt-BR')) : 'a definir',
      link: dados.link || null,
    }),
  },
  
  [TYPES.EVENTO_ATUALIZADO]: {
    titulo: 'Evento atualizado: {titulo_evento}',
    mensagem: 'O evento "{titulo_evento}" foi atualizado. Nova data: {data_evento}',
    processarDados: (dados) => ({
      ...dados,
      titulo_evento: dados.titulo_evento || 'Sem título',
      data_evento: dados.data_evento ? (typeof dados.data_evento === 'string' ? dados.data_evento : new Date(dados.data_evento).toLocaleDateString('pt-BR')) : 'a definir',
      link: dados.link || null,
    }),
  },
  
  [TYPES.EVENTO_CANCELADO]: {
    titulo: 'Evento cancelado: {titulo_evento}',
    mensagem: 'O evento "{titulo_evento}" foi cancelado. {motivo}',
    processarDados: (dados) => ({
      ...dados,
      titulo_evento: dados.titulo_evento || 'Sem título',
      motivo: dados.motivo ? `Motivo: ${dados.motivo}` : '',
      link: dados.link || null,
    }),
  },
  
  [TYPES.LEMBRETE_EVENTO]: {
    titulo: 'Lembrete: {titulo_evento}',
    mensagem: 'Não se esqueça do evento "{titulo_evento}" que acontecerá em {tempo_restante}.',
    processarDados: (dados) => ({
      ...dados,
      titulo_evento: dados.titulo_evento || 'Evento',
      tempo_restante: dados.tempo_restante || 'breve',
      link: dados.link || null,
    }),
  },
};