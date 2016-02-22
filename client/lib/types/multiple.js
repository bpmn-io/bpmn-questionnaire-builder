'use strict';

// virtual-dom
var h                        = require('virtual-dom/h');

// Components
var BpmnQuestionnaireBuilder = require('../BpmnQuestionnaireBuilder.js'),
    InputGroupCheckbox       = require('../components/inputs/InputGroupCheckbox.js');

// loadash
var assign                   = require('lodash/assign'),
    cloneDeep                = require('lodash/cloneDeep'),
    pullAt                   = require('lodash/pullAt');

var multiple = BpmnQuestionnaireBuilder.createType({

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
        new InputGroupCheckbox(that, {
          placeholder: 'Antwort',
          oncheck: onCheck.bind(that),
          onremove: onRemove.bind(that)
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
    rightAnswers: []
  },

  init: function() {
    var that = this;

    var answers = cloneDeep(this.state.answers);

    // Initialize question with one answer
    answers.push(
      new InputGroupCheckbox(this, {
        placeholder: 'Antwort',
        oncheck: onCheck.bind(that),
        onremove: onRemove.bind(that)
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
      rightAnswers: this.state.rightAnswers.map(function(input) {
        return input.state.value;
      })
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

function onCheck(input) {
  // cloneDeep would cause comparison by reference to fail
  // var rightAnswers = cloneDeep(this.state.rightAnswers);

  if(this.state.rightAnswers.indexOf(input) === -1) {
    this.state.rightAnswers.push(input);
  } else {
    this.state.rightAnswers.splice(this.state.rightAnswers.indexOf(input), 1);
  }

  this.update({
    // rightAnswers: rightAnswers
  });

  // console.log('rightAnswers', this.state.rightAnswers.map(function(input) {
  //   return input.state.value;
  // }));
}

function onRemove(answer) {
  var answers = cloneDeep(this.state.answers);

  pullAt(answers, this.state.answers.indexOf(answer));

  this.update({
    answers: answers
  });
}

module.exports = multiple;