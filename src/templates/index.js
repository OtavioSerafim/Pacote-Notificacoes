const usuarioTemplates = require('./usuarioTemplates');
const acaoTemplates = require('./acaoTemplates');
const conteudoTemplates = require('./conteudoTemplates');
const prazoTemplates = require('./prazoTemplates');
const eventoTemplates = require('./eventoTemplates');

// Combine todos os templates em um único objeto
module.exports = {
  ...usuarioTemplates,
  ...acaoTemplates,
  ...conteudoTemplates,
  ...prazoTemplates,
  ...eventoTemplates,
};