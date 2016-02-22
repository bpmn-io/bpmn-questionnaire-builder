'use strict';

// virtual-dom
var h            = require('virtual-dom/h');

// lodash
var assign       = require('lodash/assign'),
    cloneDeep    = require('lodash/cloneDeep');

// Components
var ModalConfirm = require('./modals/ModalConfirm.js');

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
    that.update({
      showModal: true
    });
  }

  function loadQuestionnaire() {
    alert('Noch nicht verfügbar.');
  }

  function updateName(value) {
    that.update({
      name: value
    });
  }

  function updateIntro(value) {
    that.update({
      intro: value
    });
  }

  // Rendering
  var modals = [];

  if (this.state.showModal) {
    modals.push(
      new ModalConfirm(this, {
        title: 'Fragebogen verwerfen',
        body: 'Soll der Fragebogen verworfen werden?',
        onconfirm: function() {
          that.builder.resetBuilder();
        }
      }).render()
    );
  }

  var html = [
    h('div.row', 
      h('div.col-sm-12', [
        h('div.row', [
          h('div.col-sm-4',
            h('h2', 'Fragebogen')
          ),
          h('div.col-sm-8', 
            h('div.btn-group.pull-sm-right', [
              h('button.btn.btn-primary-outline', {
                onclick: newQuestionnaire
              }, [
                h('i.fa.fa-plus', {
                  style: {
                    marginRight: '16px'
                  }
                }),
                'Neuer Fragebogen'
              ]),
              h('button.btn.btn-primary-outline', {
                onclick: loadQuestionnaire
              }, [
                h('i.fa.fa-folder-open', {
                  style: {
                    marginRight: '16px'
                  }
                }),
                'Fragebogen laden'
              ])
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
    ),
    modals
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

  // console.log(this.state);
};

Questionnaire.prototype.resetQuestionnaire = function() {
  
  // Reset global state to initial state
  this.update(this.initState, true);

};

Questionnaire.prototype.exportJSON = function() {
  var json = {
    name: this.state.name,
    intro: this.state.intro
  };

  return json;
}

module.exports = Questionnaire;