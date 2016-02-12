'use strict';

// virtual-dom
var h             = require('virtual-dom/h');

// lodash
var assign        = require('lodash/assign'),
    cloneDeep     = require('lodash/cloneDeep'),
    forIn         = require('lodash/forIn'),
    keys          = require('lodash/keys'),
    pullAt        = require('lodash/pullAt');

/**
 * Question component. Wraps a question and provides common functions like deleting and sorting.
 *
 * @param {Object} builder - Reference to builder instance.
 */
function Question(builder) {
  this.builder = builder;

  // Create an instance of the first type
  this.type = new this.builder.types[keys(this.builder.types)[0]](this);

  this.initState = {

    // Set type to first type
    type: keys(this.builder.types)[0]
  };

  // Set state to initial state by cloning instead of referencing
  this.state = cloneDeep(this.initState);
}

/**
 * Rendering function.
 *
 * @param {number} index - Index of question.
 */
Question.prototype.render = function(index) {

  var that = this;

  // Handler
  function moveQuestionUp() {
    var index = that.builder.questions.indexOf(that);
    var question = pullAt(that.builder.questions, index)[0];

    that.builder.questions.splice(index - 1, 0, question);

    that.builder.update({});
  }

  function moveQuestionDown() {
    var index = that.builder.questions.indexOf(that);
    var question = pullAt(that.builder.questions, index)[0];

    that.builder.questions.splice(index + 1, 0, question);

    that.builder.update({});
  }

  function removeQuestion() {
    that.builder.questions.splice(that.builder.questions.indexOf(that), 1);

    that.builder.update({
      dirty: true
    });
  }

  function changeType(value) {
    that.type = new that.builder.types[value](that); 

    that.update({
      type: value
    });
  }

  // Rendering
  var buttons = [];

  if (this.builder.questions.indexOf(this) > 0) {
    buttons.push(
      h('button.btn.btn-primary-outline', {
        onclick: moveQuestionUp
      }, [
        h('i.fa.fa-arrow-up', {
          style: {
            marginRight: '16px'
          }
        }),
        'Nach oben'
      ])
    );
  }

  if ((this.builder.questions.indexOf(this) + 1) < this.builder.questions.length) {
    buttons.push(
      h('button.btn.btn-primary-outline', {
        onclick: moveQuestionDown
      }, [
        h('i.fa.fa-arrow-down', {
          style: {
            marginRight: '16px'
          }
        }),
        'Nach unten'
      ])
    );
  }

  var options = [];

  forIn(this.builder.types, function(value, key) {
    options.push(
      h('option', {
        selected: (key === that.state.type) ? 'selected' : ''
      }, key)
    );
  });
  
  var html = 
    h('li.list-group-item', [
      h('div.row', [
        h('div.col-sm-4',
          h('h3', 'Frage ' + (index + 1) + ' von ' + this.builder.questions.length)
        ),
        h('div.col-sm-8',
          h('div.btn-group.pull-sm-right', [
            buttons,            
            h('button.btn.btn-primary-outline', {
              onclick: removeQuestion
            }, [
              h('i.fa.fa-trash', {
                style: {
                  marginRight: '16px'
                }
              }),
              'Löschen'
            ])
          ])          
        )
      ]),
      h('hr'),
      h('div.row',
        h('div.col-sm-12',
          h('form', [
            h('div.form-group.row', [
              h('label.col-sm-2', 'Typ'),
              h('div.col-sm-10',
                h('select.form-control', {
                  onchange: function() {
                    changeType(this.value);
                  }
                },
                  options
                )
              )
            ])
          ])
        )
      ),
      this.type.render()
    ]);

  return html;
};

Question.prototype.update = function(options, equal) {

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

/** Export JSON */
Question.prototype.exportJSON = function() {
  return assign(
      this.type.exportJSON(), {
        "type": this.state.type
      }
    );
}

module.exports = Question;