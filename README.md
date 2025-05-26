# Pacote de Notificações

Um sistema flexível e reutilizável para gerenciar notificações em aplicações JavaScript.

## Descrição

Este pacote fornece uma estrutura para criar, personalizar e gerenciar notificações em aplicações web ou Node.js. Ele permite definir templates de notificações reutilizáveis e gerar notificações com dados contextuais dinâmicos.

## Instalação

```bash
npm install @OtavioSerafim/pacote-notificacoes
```

## Características

- Sistema de templates de notificação personalizáveis
- Processamento de variáveis dinâmicas em templates
- Suporte para múltiplos tipos de notificações
- Implementação agnóstica ao banco de dados
- API simples para integração em qualquer projeto

## Uso Básico

### Importação

```javascript
const { createNotificationManager, types } = require('@OtavioSerafim/pacote-notificacoes');
```

### Criando uma notificação com template padrão

```javascript
// Criar gerenciador com templates padrão
const notificationManager = createNotificationManager();

// Criar uma notificação de boas-vindas
const welcomeNotification = notificationManager.createNotification(types.BOAS_VINDAS, {
  nome: 'João Silva',
  sistema: 'Portal de Clientes'
});

console.log(welcomeNotification);
/* Saída:
{
  tipo: 'BOAS_VINDAS',
  titulo: 'Bem-vindo(a) João Silva!',
  mensagem: 'Seja bem-vindo(a) ao Portal de Clientes. Estamos felizes em ter você conosco!',
  dados: { nome: 'João Silva', sistema: 'Portal de Clientes' },
  link: '/inicio',
  createdAt: [timestamp atual]
}
*/
```

### Criando um template personalizado

```javascript
// Registrar um novo template
notificationManager.registerTemplate('VENDA_CONCLUIDA', {
  titulo: 'Venda #{codigo} concluída',
  mensagem: 'Sua compra de {produto} foi concluída com sucesso! Total: R$ {valor}',
  processarDados: (dados) => ({
    ...dados,
    codigo: dados.codigo || '00000',
    produto: dados.produto || 'item',
    valor: dados.valor ? dados.valor.toFixed(2).replace('.', ',') : '0,00',
    link: dados.link || '/compras',
  }),
});

// Usar o novo template
const saleNotification = notificationManager.createNotification('VENDA_CONCLUIDA', {
  codigo: '12345',
  produto: 'Smartphone XYZ',
  valor: 1250.99
});

console.log(saleNotification);
/* Saída:
{
  tipo: 'VENDA_CONCLUIDA',
  titulo: 'Venda #12345 concluída',
  mensagem: 'Sua compra de Smartphone XYZ foi concluída com sucesso! Total: R$ 1.250,99',
  dados: { codigo: '12345', produto: 'Smartphone XYZ', valor: 1250.99 },
  link: '/compras',
  createdAt: [timestamp atual]
}
*/
```

## Templates Padrão

O pacote inclui vários templates pré-definidos organizados por categorias:

### Usuários
- `BOAS_VINDAS` - Mensagem de boas-vindas para novos usuários
- `CONTA_ATIVADA` - Confirmação de ativação de conta
- `CONTA_BLOQUEADA` - Alerta de bloqueio de conta
- `ALTERACAO_SENHA` - Confirmação de alteração de senha

### Ações
- `ACAO_CONCLUIDA` - Confirmação de uma ação finalizada
- `ACAO_PENDENTE` - Alerta sobre ação que requer atenção
- `ACAO_REJEITADA` - Informação sobre rejeição de uma ação

### Conteúdo
- `NOVO_ITEM` - Notificação sobre adição de novo item
- `ITEM_ATUALIZADO` - Notificação sobre atualização de item existente
- `ITEM_REMOVIDO` - Notificação sobre remoção de item
- `COMENTARIO_RECEBIDO` - Alerta sobre novo comentário

### Prazos
- `PRAZO_PROXIMO` - Alerta sobre prazo se aproximando
- `PRAZO_EXPIRADO` - Notificação de prazo vencido

### Eventos
- `EVENTO_CRIADO` - Informação sobre novo evento
- `EVENTO_ATUALIZADO` - Atualização de dados de evento
- `EVENTO_CANCELADO` - Cancelamento de evento
- `LEMBRETE_EVENTO` - Lembrete de evento próximo

## API Completa

### NotificationManager

#### Métodos

- `registerTemplate(tipo, template)` - Registra um novo template
- `registerTemplates(templates)` - Registra múltiplos templates
- `createNotification(tipo, dadosContexto)` - Cria uma notificação baseada em um template
- `processTemplate(template, dados)` - Processa uma string de template substituindo marcadores
- `hasTemplate(tipo)` - Verifica se um template existe
- `getTemplate(tipo)` - Obtém um template pelo tipo
- `getAvailableTypes()` - Lista todos os tipos de templates disponíveis

#### Estrutura do Template

```javascript
{
  titulo: 'Título com {variaveis}',
  mensagem: 'Corpo da mensagem com {variaveis} para substituição',
  processarDados: (dados) => ({
    // Função para pré-processar os dados antes da substituição
    // Deve retornar um objeto com os dados processados
    ...dados,
    // Valores padrão ou transformações
  })
}
```

## Personalização

Você pode inicializar o gerenciador sem os templates padrão para uma implementação totalmente personalizada:

```javascript
const { createNotificationManager } = require('@OtavioSerafim/pacote-notificacoes');

// Criar gerenciador sem templates padrão
const customManager = createNotificationManager(false);

// Adicionar apenas os templates desejados
customManager.registerTemplate('ALERTA_PERSONALIZADO', {
  titulo: 'Alerta: {tipo}',
  mensagem: '{mensagem}',
  processarDados: (dados) => ({ ...dados })
});
```

## Integrações

Este pacote apenas gera objetos de notificação e não lida diretamente com armazenamento ou entrega. Para um sistema completo, você pode:

- Salvar notificações em um banco de dados
- Enviar por e-mail usando um serviço de email
- Exibir em uma interface de usuário
- Enviar como push notifications

## Licença

MIT

## Autor

Otávio Serafim de Souza Matos

# Pacote de Notificações

[![Node.js Package](https://github.com/OtavioSerafim/Pacote-Notificacoes/actions/workflows/publish.yml/badge.svg)](https://github.com/OtavioSerafim/Pacote-Notificacoes/actions/workflows/publish.yml)

Um sistema flexível e reutilizável para gerenciar notificações em aplicações JavaScript.