'use strict';

// domReady
var domReady                 = require('domready');

// lodash

// Components
var BpmnQuestionnaireBuilder = require('./lib/BpmnQuestionnaireBuilder.js');

// Types
var interactive              = require('./lib/types/interactive.js'),
    multiple                 = require('./lib/types/multiple.js'),
    single                   = require('./lib/types/single.js');

domReady(function () {

  var builder = new BpmnQuestionnaireBuilder({
    container: 'container',
    types: {
      single: single
    }
  });

  window.builder = builder;

});