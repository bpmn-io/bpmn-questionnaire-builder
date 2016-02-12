'use strict';

// virtual-dom
var h        = require('virtual-dom/h');

// Components
var Question = require('./Question.js');

function Questions(builder) {
  this.builder = builder;
}

Questions.prototype.render = function(state) {

  var that = this;

  // Handler
  function addQuestion() {
    that.builder.questions.push(
      new Question(that.builder)
    );

    // Finally kick off rendering
    that.builder.update({
      dirty: true
    });
  }

  // Rendering
  var questions = [];

  this.builder.questions.forEach(function(question, index) {
    questions.push(
      question.render(index)
    );
  });

  var placeholder = 
    h('li.list-group-item',
      h('div.row',
        h('div.col-sm-12',
          h('h3', {
            style: {
              textAlign: 'center'
            }
          }, 'Keine Fragen')
        )
      )
    );

  // Rendering
  var html = [
    h('div.row', [
      h('div.col-sm-4',
        h('h2', 'Fragen')
      ),
      h('div.col-sm-8',
        h('button.btn.btn-primary-outline.pull-sm-right', {
          onclick: addQuestion
        }, [
          h('i.fa.fa-plus', {
            style: {
              marginRight: '16px'
            }
          }),
          'Neue Frage'
        ])
      )
    ]),
    h('hr'),
    h('ul.list-group', 
      questions.length ? questions : placeholder
    )
  ];

  return html;
};

module.exports = Questions;