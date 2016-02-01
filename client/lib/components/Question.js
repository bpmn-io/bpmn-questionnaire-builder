'use strict';

// virtual-dom
var h = require('virtual-dom/h');

function Question(app) {
  this.app = app;
}

Question.prototype.render = function(state) {

  // Rendering
  var html = [
    h('div.row', [
      h('div.col-sm-8',
        h('h2', 'Fragen')
      ),
      h('div.col-sm-4',
        h('button.btn.btn-primary-outline.btn-block', {
          onclick: function() {

          }
        }, [
          h('i.fa.fa-plus', {
            style: {
              marginRight: '16px'
            }
          }),
          'Neue Frage'
        ])
      )
    ])
  ];

  return html;
};

module.exports = Question;