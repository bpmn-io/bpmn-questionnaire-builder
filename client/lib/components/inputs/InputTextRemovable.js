'use strict';

// virtual-dom
var h         = require('virtual-dom/h');

// lodash
var assign    = require('lodash/assign'),
    cloneDeep = require('lodash/cloneDeep');

/**
 * Input component of type text.
 */
function InputTextRemovable(question, options) {
  this.question = question;
  this.options = options;
  this.onremove = this.options.onremove;
  this.placeholder = options.placeholder ? options.placeholder : '';

  this.initState = {
    value: ''
  };

  this.state = cloneDeep(this.initState);

}

InputTextRemovable.prototype.render = function() {

  var that = this;

  // Handler
  function updateText(value) {
    that.update({
      value: value
    });
  }

  // Rendering
  var html = 
    h('div.input-group', [
      h('input.form-control', {
        type: 'text',
        value: this.state.value.length ? this.state.value : '',
        placeholder: this.placeholder ? this.options.placeholder : '',
        onkeyup: function() {
          updateText(this.value);
        },
        onblur: function() {
          updateText(this.value);
        }
      }),
      h('div.input-group-addon.btn.btn-secondary-outline', {
        onclick: function() {
          that.onremove(that);
        }
      },
        h('i.fa.fa-trash')
      )
    ]);

  return html;
}

InputTextRemovable.prototype.update = function(options, equal) {

  // Always clone to prevent mutation
  options = cloneDeep(options);

  if(equal) {

    // Set state equal to options
    this.state = options;
  } else {
    
    // Update state
    assign(this.state, options);
  }

  this.question.update({});

  console.log(this.state);
};

InputTextRemovable.prototype.reset = function() {
  
  // Reset global state to initial state
  this.update(this.initState, true);

};

module.exports = InputTextRemovable;