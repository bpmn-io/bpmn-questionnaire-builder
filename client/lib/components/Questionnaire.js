'use strict';

// virtual-dom
var h = require('virtual-dom/h');

function Questionnaire(app) {
  this.app = app;
}

Questionnaire.prototype.render = function(state) {

  var that = this;

  // Handler
  function newQuestionnaire() {
    that.app.resetApp();
  }

  function updateName(value) {
    that.app.update({
      name: value
    });
  }

  function updateIntro(value) {
    that.app.update({
      intro: value
    });
  }

  // Rendering
  var html = [
    h('div.row', 
      h('div.col-md-12', [
        h('div.row', [
          h('div.col-sm-8',
            h('h2', 'Fragebogen')
          ),
          h('div.col-sm-4',
            h('button.btn.btn-primary-outline.btn-block', {
              onclick: newQuestionnaire
            }, [
              h('i.fa.fa-plus', {
                style: {
                  marginRight: '16px'
                }
              }),
              'Neuer Fragebogen'
            ])
          )
        ]),
        h('hr'),
        h('form', [
          h('div.form-group.row', [
            h('label.col-sm-2.form-control-label', 'Name'),
            h('div.col-sm-10',
              h('input.form-control', {
                placeholder: 'Name',
                value: state.name,
                onkeyup: function() {
                  updateName(this.value);
                }
              })
            )
          ]),
          h('div.form-group.row', [
            h('label.col-sm-2.form-control-label', 'Name'),
            h('div.col-sm-10',
              h('textarea.form-control', {
                placeholder: 'Intro',
                rows: 3,
                value: state.intro,
                onkeyup: function() {
                  updateIntro(this.value);
                }
              })
            )
          ])
        ])
      ])
    )
  ];

  return html;
};

module.exports = Questionnaire;