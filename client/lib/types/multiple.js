'use strict';

// virtual-dom
var h                        = require('virtual-dom/h');

var BpmnQuestionnaireBuilder = require('../BpmnQuestionnaireBuilder.js');

var multiple = BpmnQuestionnaireBuilder.createType({
  render: function() {
    var html = h('h1', 'Hello from multi');

    return html;
  },

  properties: {
    text: '',
    answers: [],
    rightAnswer: []
  },

  exportJSON: function() {
    var json = {"bar": "multi"};

    return json;
  }
});

module.exports = multiple;