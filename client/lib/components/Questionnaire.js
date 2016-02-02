'use strict';

// virtual-dom
var h             = require('virtual-dom/h');

// lodash
var assign        = require('lodash/assign'),
    cloneDeep     = require('lodash/cloneDeep');

function Questionnaire(builder) {
  this.builder = builder;

  this.initState = {
    'name': '',
    'intro': ''
  };

  // Set state to initial state by cloning instead of referencing
  this.state = cloneDeep(this.initState);
}

Questionnaire.prototype.render = function(state) {

  var that = this;

  // Handler
  function newQuestionnaire() {
    that.builder.resetBuilder();
  }

  function updateName(value) {
    that.update({
      name: value
    });
    
    that.builder.update({
      dirty: true
    });
  }

  function updateIntro(value) {
    that.update({
      intro: value
    });

    that.builder.update({
      dirty: true
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
                value: this.state.name,
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
                value: this.state.intro,
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

Questionnaire.prototype.update = function(options, equal) {

  // Always clone to prevent mutation
  options = cloneDeep(options);

  if(equal) {

    // Set state equal to options
    this.state = options;
  } else {
    
    // Update state
    assign(this.state, options);
  }

  // Finally kick off rendering
  this.builder.update({});

  console.log(this.state);
};

Questionnaire.prototype.resetQuestionnaire = function() {
  
  // Reset global state to initial state
  this.update(this.initState, true);

};

module.exports = Questionnaire;