'use strict';

// domReady
var domReady                 = require('domready');

// lodash

// Components
var BpmnQuestionnaireBuilder = require('./lib/BpmnQuestionnaireBuilder.js');

// Types
var multiple                 = require('./lib/types/multiple.js'),
    single                   = require('./lib/types/single.js');

domReady(function () {

  var builder = new BpmnQuestionnaireBuilder({
    container: 'container',
    types: {
      multiple: multiple,
      single: single
    }
  });

  window.builder = builder;

});