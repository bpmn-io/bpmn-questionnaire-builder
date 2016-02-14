'use strict';

// virtual-dom
var h                        = require('virtual-dom/h');

// Components
var BpmnQuestionnaireBuilder = require('../BpmnQuestionnaireBuilder.js'),
    InputGroupRadio          = require('../components/inputs/InputGroupRadio.js');

// loadash
var assign                   = require('lodash/assign'),
    cloneDeep                = require('lodash/cloneDeep'),
    pullAt                   = require('lodash/pullAt');

var single = BpmnQuestionnaireBuilder.createType({

  render: function() {

    var that = this;

    // Handler
    function updateText(value) {
      that.update({
        text: value
      });
    }

    function newAnswer() {
      var answers = cloneDeep(that.state.answers);

      answers.push(
        new InputGroupRadio(that, {
          placeholder: 'Antwort',
          oncheck: function(input) {
            that.update({
              rightAnswer: [input.state.value]
            });

            that.state.answers.forEach(function(answer) {
              if (answer !== input) {
                answer.update({
                  checked: false
                });
              }
            });
          },
          onremove: function(answer) {
            var answers = cloneDeep(that.state.answers);

            pullAt(answers, that.state.answers.indexOf(answer));

            that.update({
              answers: answers
            });
          }
        })
      );

      that.update({
        answers: answers
      });
    }

    function updateRightAnswer(value) {
      that.update({
        rightAnswer: [value]
      });
    }

    function updateDiagram(options) {
      var diagram = cloneDeep(that.state.diagram);

      diagram = assign(diagram, options);

      that.update({
        diagram: diagram
      });
    }

    // Rendering
    var answers = [];

    // Prevent deleting all answers
    if (this.state.answers.length > 1) {
      this.state.answers.forEach(function(answer) {
        answers.push(
          answer.render({
            disableRemove: false
          })
        );
      });
    } else {
      answers.push(
        this.state.answers[0].render({
          disableRemove: true
        })
      );
    }

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
                  rows: '5',
                  value: (this.state.text.length) ? this.state.text : ''
                })
              )
            ]),
            h('div.form-group.row', [
              h('label.col-sm-2', 'Anworten'),
              h('div.col-sm-10',
                answers
              )
            ]),
            h('div.form-group.row',
              h('div.col-sm-10.col-sm-offset-2',
                h('button.btn.btn-primary-outline.pull-sm-right', {
                  type: 'button',
                  onclick: newAnswer
                }, [
                  h('i.fa.fa-plus', {
                    style: {
                      marginRight: '16px'
                    }
                  }),
                  'Neue Antwort'
                ])
              )
            ),
            h('div.form-group.row', [
              h('label.col-sm-2', 'Prozessmodell'),
              h('div.col-sm-10',
                h('input.form-control', {
                  type: 'text',
                  onkeyup: function() {
                    updateDiagram({
                      url: this.value,
                      interactive: false
                    });
                  },
                  onblur: function() {
                    updateDiagram({
                      url: this.value,
                      interactive: false
                    });
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

  init: function() {
    var that = this;

    var answers = cloneDeep(this.state.answers);

    // Initialize question with one answer
    answers.push(
      new InputGroupRadio(this, {
        placeholder: 'Antwort',
        oncheck: function(input) {
          that.update({
            rightAnswer: [input.state.value]
          });

          that.state.answers.forEach(function(answer) {
            if (answer !== input) {
              answer.update({
                checked: false
              });
            }
          });
        },
        onremove: function(answer) {
          var answers = cloneDeep(that.state.answers);

          pullAt(answers, that.state.answers.indexOf(answer));

          that.update({
            answers: answers
          });
        }
      })
    );

    this.update({
      answers: answers
    });
  },
  
  exportJSON: function() {
    
    var json = {
      text: this.state.text,
      answers: this.state.answers.map(function(answer) {
        return answer.state.value;
      }),
      rightAnswer: this.state.rightAnswer.length ? this.state.rightAnswer : [this.state.answers[0].state.value]
    };

    if (this.state.diagram) {
      if (this.state.diagram.url.length || this.state.diagram.xml.length) {
        assign(json, {
          diagram: this.state.diagram
        });
      }
    }

    return json;
  }

});

module.exports = single;