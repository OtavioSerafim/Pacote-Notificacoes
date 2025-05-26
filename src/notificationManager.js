/**
 * Gerenciador de notificações
 * Responsável por criar e gerenciar templates de notificação
 */
class NotificationManager {
  constructor() {
    this.templates = {};
  }

  /**
   * Registra um novo template de notificação
   * @param {string} tipo - Tipo/chave da notificação
   * @param {object} template - Configuração do template
   * @returns {NotificationManager} A própria instância para encadeamento
   */
  registerTemplate(tipo, template) {
    if (!template.titulo || !template.mensagem) {
      throw new Error('Os templates devem ter pelo menos título e mensagem');
    }

    this.templates[tipo] = template;
    return this;
  }

  /**
   * Registra múltiplos templates de notificação
   * @param {object} templates - Objeto com tipos e templates
   * @returns {NotificationManager} A própria instância para encadeamento
   */
  registerTemplates(templates) {
    Object.entries(templates).forEach(([tipo, template]) => {
      this.registerTemplate(tipo, template);
    });
    return this;
  }

  /**
   * Processa uma string de template substituindo marcadores entre chaves pelos valores do objeto dados
   * @param {string} template - Template contendo marcadores {chave}
   * @param {object} dados - Objeto com os dados para substituir os marcadores
   * @returns {string} String processada com valores substituídos
   */
  processTemplate(template, dados) {
    return template.replace(/{([^}]+)}/g, (match, key) => (dados[key] !== undefined ? dados[key] : match));
  }

  /**
   * Cria uma notificação baseada em um template pré-definido
   * @param {string} tipo - Tipo de notificação (deve existir nos templates)
   * @param {object} dadosContexto - Dados específicos para esse contexto de notificação
   * @returns {object} Objeto de notificação processado
   */
  createNotification(tipo, dadosContexto = {}) {
    if (!this.templates[tipo]) {
      throw new Error(`Template de notificação "${tipo}" não encontrado`);
    }

    const template = this.templates[tipo];

    // Pré-processar dados
    let dadosProcessados = dadosContexto;
    if (template.processarDados) {
      dadosProcessados = template.processarDados(dadosContexto);
    }

    // Processar título e mensagem
    const titulo = this.processTemplate(template.titulo, dadosProcessados);
    const mensagem = this.processTemplate(template.mensagem, dadosProcessados);

    // Criar o objeto de notificação
    return {
      tipo,
      titulo,
      mensagem,
      dados: dadosContexto, // Armazena os dados originais para referência
      link: dadosProcessados.link || null,
      createdAt: new Date(),
    };
  }

  /**
   * Verifica se um template existe
   * @param {string} tipo - Tipo do template
   * @returns {boolean}
   */
  hasTemplate(tipo) {
    return !!this.templates[tipo];
  }

  /**
   * Obtém um template pelo tipo
   * @param {string} tipo - Tipo do template
   * @returns {object|null} O template ou null se não encontrado
   */
  getTemplate(tipo) {
    return this.templates[tipo] || null;
  }

  /**
   * Lista todos os tipos de templates disponíveis
   * @returns {string[]} Array com os tipos de templates
   */
  getAvailableTypes() {
    return Object.keys(this.templates);
  }
}

module.exports = NotificationManager;