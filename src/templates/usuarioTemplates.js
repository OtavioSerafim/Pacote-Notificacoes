const TYPES = require('../types');

/**
 * Templates relacionados a usuários
 */
module.exports = {
  [TYPES.BOAS_VINDAS]: {
    titulo: 'Bem-vindo(a) {nome}!',
    mensagem: 'Seja bem-vindo(a) ao {sistema}. Estamos felizes em ter você conosco!',
    processarDados: (dados) => ({
      ...dados,
      nome: dados.nome || 'usuário',
      sistema: dados.sistema || 'nosso sistema',
      link: dados.link || '/inicio',
    }),
  },
  
  [TYPES.CONTA_ATIVADA]: {
    titulo: 'Sua conta foi ativada',
    mensagem: 'Olá {nome}, sua conta foi ativada com sucesso e já está pronta para uso!',
    processarDados: (dados) => ({
      ...dados,
      nome: dados.nome || 'usuário',
      link: dados.link || '/perfil',
    }),
  },
  
  [TYPES.CONTA_BLOQUEADA]: {
    titulo: 'Alerta de segurança',
    mensagem: 'Por motivos de segurança, sua conta foi temporariamente bloqueada. Entre em contato com nosso suporte para mais informações.',
    processarDados: (dados) => ({
      ...dados,
      link: dados.link || '/suporte',
    }),
  },
  
  [TYPES.ALTERACAO_SENHA]: {
    titulo: 'Alteração de senha',
    mensagem: 'Sua senha foi alterada com sucesso. Se você não solicitou esta alteração, entre em contato com o suporte imediatamente.',
    processarDados: (dados) => ({
      ...dados,
      link: dados.link || '/suporte',
    }),
  },
};