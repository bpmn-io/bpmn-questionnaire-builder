'use strict';

// virtual-dom
var h             = require('virtual-dom/h');

// lodash
var assign        = require('lodash/assign'),
    cloneDeep     = require('lodash/cloneDeep'),
    forIn         = require('lodash/forIn'),
    keys          = require('lodash/keys');

function Question(builder) {
  this.builder = builder;

  this.initState = {
    type: keys(this.builder.types)[0]
  };

  // Set state to initial state by cloning instead of referencing
  this.state = cloneDeep(this.initState);
}

Question.prototype.render = function(index) {

  var that = this;

  // Handler
  function removeQuestion() {
    that.builder.questions.splice(that.builder.questions.indexOf(that), 1);

    that.builder.update({
      dirty: true
    });
  }

  function changeType(value) {
    that.update({
      type: value
    });
  }

  var options = [];

  forIn(this.builder.types, function(value, key) {
    options.push(
      h('option', key)
    );
  });

  // Rendering
  var html = 
    h('li.list-group-item', [
      h('div.row', [
          h('div.col-sm-8',
            h('h3', 'Frage ' + (index + 1) + ' von ' + this.builder.questions.length)
          ),
          h('div.col-sm-4',
            h('button.btn.btn-primary-outline.btn-block', {
              onclick: removeQuestion
            }, [
              h('i.fa.fa-trash', {
                style: {
                  marginRight: '16px'
                }
              }),
              'Löschen'
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
      this.builder.types[this.state.type]()
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

Question.prototype.resetQuestion = function() {
  
  // Reset global state to initial state
  this.update(this.initState, true);

};

module.exports = Question;