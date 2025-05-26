/**
 * Representa um template para notificações
 */
export interface Template {
  /**
   * Título do template com marcadores {variavel}
   */
  titulo: string;
  
  /**
   * Corpo da mensagem com marcadores {variavel}
   */
  mensagem: string;
  
  /**
   * Função opcional para processar dados antes da substituição de variáveis
   * @param dados Os dados originais fornecidos
   * @returns Os dados processados
   */
  processarDados?: (dados: Record<string, any>) => Record<string, any>;
}

/**
 * Dados que podem ser usados para preencher um template
 */
export interface NotificationData {
  /**
   * Nome do usuário
   */
  nome?: string;
  
  /**
   * Nome do sistema
   */
  sistema?: string;
  
  /**
   * Link relacionado à notificação
   */
  link?: string;
  
  /**
   * Tipo de ação
   */
  tipo_acao?: string;
  
  /**
   * Descrição de item ou ação
   */
  descricao?: string;
  
  /**
   * Motivo de rejeição ou cancelamento
   */
  motivo?: string;
  
  /**
   * Tipo de item
   */
  tipo_item?: string;
  
  /**
   * Título de item
   */
  titulo_item?: string;
  
  /**
   * Autor de um comentário ou ação
   */
  autor?: string;
  
  /**
   * Conteúdo de um comentário
   */
  texto_comentario?: string;
  
  /**
   * Data limite para um prazo
   */
  data_limite?: string | Date;
  
  /**
   * Título de um evento
   */
  titulo_evento?: string;
  
  /**
   * Data de um evento
   */
  data_evento?: string | Date;
  
  /**
   * Tempo restante para um evento
   */
  tempo_restante?: string;
  
  /**
   * Propriedades adicionais
   */
  [key: string]: any;
}

/**
 * Representa uma notificação processada
 */
export interface Notification {
  /**
   * O tipo da notificação
   */
  tipo: string;
  
  /**
   * O título processado
   */
  titulo: string;
  
  /**
   * A mensagem processada
   */
  mensagem: string;
  
  /**
   * Os dados originais fornecidos
   */
  dados: NotificationData;
  
  /**
   * Link relacionado à notificação
   */
  link: string | null;
  
  /**
   * Data de criação
   */
  createdAt: Date;
  
  /**
   * Identificador único da notificação
   */
  id: string;
}

/**
 * Gerenciador de notificações
 */
export class NotificationManager {
  /**
   * Cria uma nova instância do NotificationManager
   */
  constructor();
  
  /**
   * Registra um novo template de notificação
   * @param tipo Tipo/chave da notificação
   * @param template Configuração do template
   * @returns A própria instância para encadeamento
   * @throws {TypeError} Se o tipo ou template forem inválidos
   */
  registerTemplate(tipo: string, template: Template): NotificationManager;
  
  /**
   * Registra múltiplos templates de notificação
   * @param templates Objeto com tipos e templates
   * @returns A própria instância para encadeamento
   * @throws {TypeError} Se templates não for um objeto
   */
  registerTemplates(templates: Record<string, Template>): NotificationManager;
  
  /**
   * Processa uma string de template substituindo marcadores entre chaves pelos valores do objeto dados
   * @param template Template contendo marcadores {chave}
   * @param dados Objeto com os dados para substituir os marcadores
   * @returns String processada com valores substituídos
   * @throws {TypeError} Se template não for uma string
   */
  processTemplate(template: string, dados: NotificationData): string;
  
  /**
   * Cria uma notificação baseada em um template pré-definido
   * @param tipo Tipo de notificação (deve existir nos templates)
   * @param dadosContexto Dados específicos para esse contexto de notificação
   * @returns Objeto de notificação processado
   * @throws {Error} Se o template não for encontrado
   * @throws {TypeError} Se o tipo for inválido
   */
  createNotification(tipo: string, dadosContexto?: NotificationData): Notification;
  
  /**
   * Verifica se um template existe
   * @param tipo Tipo do template
   * @returns true se o template existir, false caso contrário
   */
  hasTemplate(tipo: string): boolean;
  
  /**
   * Obtém um template pelo tipo
   * @param tipo Tipo do template
   * @returns O template ou null se não encontrado
   */
  getTemplate(tipo: string): Template | null;
  
  /**
   * Lista todos os tipos de templates disponíveis
   * @returns Array com os tipos de templates
   */
  getAvailableTypes(): string[];
}

/**
 * Cria uma instância do gerenciador de notificações com templates pré-carregados
 * @param useDefaultTemplates Se true, carrega os templates padrão
 * @returns Uma instância do gerenciador de notificações
 */
export function createNotificationManager(useDefaultTemplates?: boolean): NotificationManager;
