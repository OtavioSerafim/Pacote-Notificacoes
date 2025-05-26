const TYPES = require('../types');

/**
 * Templates relacionados a conteúdo
 */
module.exports = {
  [TYPES.NOVO_ITEM]: {
    titulo: 'Novo {tipo_item} adicionado',
    mensagem: 'Um novo {tipo_item} foi adicionado: {titulo_item}',
    processarDados: (dados) => ({
      ...dados,
      tipo_item: dados.tipo_item || 'item',
      titulo_item: dados.titulo_item || 'Sem título',
      link: dados.link || null,
    }),
  },
  
  [TYPES.ITEM_ATUALIZADO]: {
    titulo: '{tipo_item} atualizado',
    mensagem: 'O {tipo_item} "{titulo_item}" foi atualizado',
    processarDados: (dados) => ({
      ...dados,
      tipo_item: dados.tipo_item || 'item',
      titulo_item: dados.titulo_item || 'Sem título',
      link: dados.link || null,
    }),
  },
  
  [TYPES.ITEM_REMOVIDO]: {
    titulo: '{tipo_item} removido',
    mensagem: 'O {tipo_item} "{titulo_item}" foi removido',
    processarDados: (dados) => ({
      ...dados,
      tipo_item: dados.tipo_item || 'item',
      titulo_item: dados.titulo_item || 'Sem título',
    }),
  },
  
  [TYPES.COMENTARIO_RECEBIDO]: {
    titulo: 'Novo comentário',
    mensagem: '{autor} comentou: "{texto_comentario}"',
    processarDados: (dados) => ({
      ...dados,
      autor: dados.autor || 'Alguém',
      texto_comentario: dados.texto_comentario || '',
      link: dados.link || null,
    }),
  },
};