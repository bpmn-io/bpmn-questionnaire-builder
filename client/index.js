'use strict';

// domReady
var domReady                 = require('domready');

// lodash

// Components
var BpmnQuestionnaireBuilder = require('./lib/BpmnQuestionnaireBuilder.js');

// Utils

domReady(function () {
  
  var builder = new BpmnQuestionnaireBuilder({
    container: 'container'
  });

});