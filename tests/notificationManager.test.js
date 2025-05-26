const { NotificationManager } = require('../src/index');
const TYPES = require('../src/types');

describe('NotificationManager', () => {
  let manager;
  
  beforeEach(() => {
    manager = new NotificationManager();
  });
  
  test('registra e recupera um template corretamente', () => {
    const template = {
      titulo: 'Teste {valor}',
      mensagem: 'Mensagem de teste com {valor}'
    };
    
    manager.registerTemplate('TEST_TYPE', template);
    expect(manager.hasTemplate('TEST_TYPE')).toBe(true);
    expect(manager.getTemplate('TEST_TYPE')).toEqual(template);
  });
  
  test('cria notificação com valores substituídos', () => {
    manager.registerTemplate('TEST_TYPE', {
      titulo: 'Teste {valor}',
      mensagem: 'Mensagem de teste com {valor}'
    });
    
    const notification = manager.createNotification('TEST_TYPE', { valor: '123' });
    expect(notification.titulo).toBe('Teste 123');
    expect(notification.mensagem).toBe('Mensagem de teste com 123');
  });
  
  test('lança erro ao registrar template com tipo inválido', () => {
    expect(() => {
      manager.registerTemplate(null, { titulo: 'Teste', mensagem: 'Mensagem' });
    }).toThrow('O tipo do template deve ser uma string não vazia');
  });
  
  test('lança erro ao registrar template sem título ou mensagem', () => {
    expect(() => {
      manager.registerTemplate('TEST_TYPE', { mensagem: 'Apenas mensagem' });
    }).toThrow('O template deve ter um título');
    
    expect(() => {
      manager.registerTemplate('TEST_TYPE', { titulo: 'Apenas título' });
    }).toThrow('O template deve ter uma mensagem');
  });
  
  test('processa dados antes de criar notificação', () => {
    manager.registerTemplate('TEST_TYPE', {
      titulo: 'Olá {nome}',
      mensagem: 'Bem-vindo ao {sistema}',
      processarDados: (dados) => ({
        ...dados,
        nome: dados.nome?.toUpperCase() || 'VISITANTE',
        sistema: dados.sistema || 'SISTEMA PADRÃO'
      })
    });
    
    const notification = manager.createNotification('TEST_TYPE', { nome: 'João' });
    expect(notification.titulo).toBe('Olá JOÃO');
    expect(notification.mensagem).toBe('Bem-vindo ao SISTEMA PADRÃO');
  });
  
  test('gera ID único para cada notificação', () => {
    manager.registerTemplate('TEST_TYPE', {
      titulo: 'Teste',
      mensagem: 'Mensagem'
    });
    
    const notification1 = manager.createNotification('TEST_TYPE');
    const notification2 = manager.createNotification('TEST_TYPE');
    
    expect(notification1.id).toBeDefined();
    expect(notification2.id).toBeDefined();
    expect(notification1.id).not.toBe(notification2.id);
  });
});