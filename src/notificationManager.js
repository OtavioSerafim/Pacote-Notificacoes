/**
 * @typedef {Object} Template
 * @property {string} titulo - O título do template com marcadores {variavel}
 * @property {string} mensagem - O corpo da mensagem com marcadores {variavel}
 * @property {function(Object):Object} [processarDados] - Função opcional para processar dados antes da substituição
 */

/**
 * @typedef {Object} NotificationData
 * @property {string} [nome] - Nome do usuário
 * @property {string} [sistema] - Nome do sistema
 * @property {string} [link] - Link relacionado à notificação
 * @property {*} [any] - Quaisquer outros dados contextuais
 */

/**
 * @typedef {Object} Notification
 * @property {string} tipo - O tipo da notificação
 * @property {string} titulo - O título processado
 * @property {string} mensagem - A mensagem processada
 * @property {NotificationData} dados - Os dados originais fornecidos
 * @property {string|null} link - Link relacionado à notificação
 * @property {Date} createdAt - Data de criação
 * @property {string} id - Identificador único da notificação
 */

/**
 * Gerenciador de notificações
 * Responsável por criar e gerenciar templates de notificação
 * @class
 */
class NotificationManager {
  /**
   * Cria uma nova instância do NotificationManager
   */
  constructor() {
    /**
     * Coleção de templates de notificação
     * @type {Object.<string, Template>}
     * @private
     */
    this.templates = {};
  }

  /**
   * Registra um novo template de notificação
   * @param {string} tipo - Tipo/chave da notificação
   * @param {Template} template - Configuração do template
   * @returns {NotificationManager} A própria instância para encadeamento
   * @throws {TypeError} Se o tipo ou template forem inválidos
   */
  registerTemplate(tipo, template) {
    if (!tipo || typeof tipo !== 'string') {
      throw new TypeError('O tipo do template deve ser uma string não vazia');
    }
    
    if (!template || typeof template !== 'object') {
      throw new TypeError('O template deve ser um objeto');
    }
    
    if (!template.titulo || typeof template.titulo !== 'string') {
      throw new TypeError('O template deve ter um título (string)');
    }
    
    if (!template.mensagem || typeof template.mensagem !== 'string') {
      throw new TypeError('O template deve ter uma mensagem (string)');
    }

    if (template.processarDados !== undefined && typeof template.processarDados !== 'function') {
      throw new TypeError('A propriedade processarDados deve ser uma função');
    }

    this.templates[tipo] = template;
    return this;
  }

  /**
   * Registra múltiplos templates de notificação
   * @param {Object.<string, Template>} templates - Objeto com tipos e templates
   * @returns {NotificationManager} A própria instância para encadeamento
   * @throws {TypeError} Se templates não for um objeto
   */
  registerTemplates(templates) {
    if (!templates || typeof templates !== 'object') {
      throw new TypeError('Os templates devem ser fornecidos como um objeto');
    }
    
    Object.entries(templates).forEach(([tipo, template]) => {
      this.registerTemplate(tipo, template);
    });
    return this;
  }

  /**
   * Processa uma string de template substituindo marcadores entre chaves pelos valores do objeto dados
   * @param {string} template - Template contendo marcadores {chave}
   * @param {NotificationData} dados - Objeto com os dados para substituir os marcadores
   * @returns {string} String processada com valores substituídos
   * @throws {TypeError} Se template não for uma string
   */
  processTemplate(template, dados) {
    if (typeof template !== 'string') {
      throw new TypeError('O template deve ser uma string');
    }
    
    if (!dados || typeof dados !== 'object') {
      return template;
    }
    
    return template.replace(/{([^}]+)}/g, (match, key) => (
      dados[key] !== undefined ? String(dados[key]) : match
    ));
  }

  /**
   * Cria uma notificação baseada em um template pré-definido
   * @param {string} tipo - Tipo de notificação (deve existir nos templates)
   * @param {NotificationData} dadosContexto - Dados específicos para esse contexto de notificação
   * @returns {Notification} Objeto de notificação processado
   * @throws {Error} Se o template não for encontrado
   * @throws {TypeError} Se o tipo for inválido
   */
  createNotification(tipo, dadosContexto = {}) {
    if (!tipo || typeof tipo !== 'string') {
      throw new TypeError('O tipo de notificação deve ser uma string não vazia');
    }
    
    if (!this.templates[tipo]) {
      throw new Error(`Template de notificação "${tipo}" não encontrado`);
    }

    const template = this.templates[tipo];

    if (dadosContexto !== undefined && typeof dadosContexto !== 'object') {
      throw new TypeError('Os dados de contexto devem ser um objeto');
    }

    try {
      const dadosCopiados = JSON.parse(JSON.stringify(dadosContexto || {}));
      
      let dadosProcessados = dadosCopiados;
      if (template.processarDados && typeof template.processarDados === 'function') {
        try {
          dadosProcessados = template.processarDados(dadosCopiados);
          if (!dadosProcessados || typeof dadosProcessados !== 'object') {
            throw new Error('A função processarDados deve retornar um objeto');
          }
        } catch (error) {
          dadosProcessados = dadosCopiados;
          console.warn(`Erro ao processar dados para o template "${tipo}": ${error.message}`);
        }
      }

      const titulo = this.processTemplate(template.titulo, dadosProcessados);
      const mensagem = this.processTemplate(template.mensagem, dadosProcessados);

      const timestamp = new Date();
      const notification = Object.freeze({
        tipo,
        titulo,
        mensagem,
        dados: Object.freeze({ ...dadosCopiados }),
        link: dadosProcessados.link || null,
        createdAt: timestamp,
        id: `${tipo}_${timestamp.getTime()}_${Math.random().toString(36).substr(2, 9)}`,
      });

      return notification;
    } catch (error) {
      if (error instanceof TypeError || error instanceof SyntaxError) {
        throw new Error(`Erro ao criar notificação '${tipo}': ${error.message}`);
      }
      throw error;
    }
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
   * @returns {Template|null} O template ou null se não encontrado
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