'use strict';

// virtual-dom
var h                        = require('virtual-dom/h');

var BpmnQuestionnaireBuilder = require('../BpmnQuestionnaireBuilder.js');

var multiple = BpmnQuestionnaireBuilder.createType({
  render: function() {
    var html =
      h('div.row',
        h('div.col-sm-12',
          h('form', [
            h('div.form-group.row', [
              h('label.col-sm-2', 'Text'),
              h('div.col-sm-10',
                h('textarea.form-control', {
                  onkeyup: function() {
                    updateText(this.value);
                  },
                  placeholder: 'Text',
                  value: (this.state.text.length) ? this.state.text : ''
                })
              )
            ]),
            h('div.form-group.row', [
              h('label.col-sm-2', 'Prozessmodell'),
              h('div.col-sm-10',
                h('input.form-control', {
                  type: 'text',
                  onkeyup: function() {
                    updateDiagram({url: this.value});
                  },
                  onblur: function() {
                    updateDiagram({url: this.value});
                  },
                  placeholder: 'http://',
                  value: (this.state.diagram) ? (this.state.diagram.url ? this.state.diagram.url : '') : ''
                })
              )
            ])
          ])
        )
      );

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