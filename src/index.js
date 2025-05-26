const NotificationManager = require('./notificationManager');
const types = require('./types');
const defaultTemplates = require('./templates');

/**
 * Cria uma instância do gerenciador de notificações com templates pré-carregados
 * @param {boolean} useDefaultTemplates - Se true, carrega os templates padrão
 * @returns {NotificationManager} Uma instância do gerenciador de notificações
 */
function createNotificationManager(useDefaultTemplates = true) {
  const manager = new NotificationManager();
  
  if (useDefaultTemplates) {
    manager.registerTemplates(defaultTemplates);
  }
  
  return manager;
}

// Exportar componentes principais
module.exports = {
  NotificationManager,
  createNotificationManager,
  types,
  defaultTemplates,
};