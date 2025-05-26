/**
 * Tipos de notificações genéricas
 * 
 * Este arquivo centraliza constantes de tipos de notificação genéricas
 * que podem ser usadas em diferentes aplicações
 */

module.exports = {
  // Notificações relacionadas a usuários
  BOAS_VINDAS: 'BOAS_VINDAS',
  CONTA_ATIVADA: 'CONTA_ATIVADA',
  CONTA_BLOQUEADA: 'CONTA_BLOQUEADA',
  ALTERACAO_SENHA: 'ALTERACAO_SENHA',
  
  // Notificações relacionadas a ações do sistema
  ACAO_CONCLUIDA: 'ACAO_CONCLUIDA',
  ACAO_PENDENTE: 'ACAO_PENDENTE',
  ACAO_REJEITADA: 'ACAO_REJEITADA',
  
  // Notificações relacionadas a conteúdo
  NOVO_ITEM: 'NOVO_ITEM',
  ITEM_ATUALIZADO: 'ITEM_ATUALIZADO',
  ITEM_REMOVIDO: 'ITEM_REMOVIDO',
  COMENTARIO_RECEBIDO: 'COMENTARIO_RECEBIDO',
  
  // Notificações relacionadas a prazos
  PRAZO_PROXIMO: 'PRAZO_PROXIMO',
  PRAZO_EXPIRADO: 'PRAZO_EXPIRADO',
  
  // Notificações relacionadas a eventos
  EVENTO_CRIADO: 'EVENTO_CRIADO',
  EVENTO_ATUALIZADO: 'EVENTO_ATUALIZADO',
  EVENTO_CANCELADO: 'EVENTO_CANCELADO',
  LEMBRETE_EVENTO: 'LEMBRETE_EVENTO',
};