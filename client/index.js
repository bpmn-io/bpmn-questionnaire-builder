'use strict';

// domReady
var domReady                 = require('domready');

// lodash

// Components
var BpmnQuestionnaireBuilder = require('./lib/BpmnQuestionnaireBuilder.js');

// Utils

domReady(function () {

  var single = BpmnQuestionnaireBuilder.createType({
    options: [
      {
        type: 'textarea',
        name: 'Text'
      },
      {
        type: 'input',
        name: 'URL'
      }
    ],
    type: 'Single'
  });

  var multiple = BpmnQuestionnaireBuilder.createType({
    options: [
      {
        type: 'input',
        name: 'URL'
      },
      {
        type: 'textarea',
        name: 'Text'
      }
    ],
    type: 'Multi'
  });

  var builder = new BpmnQuestionnaireBuilder({
    container: 'container',
    types: {
      single:   single,
      multiple: multiple
    }
  });

});