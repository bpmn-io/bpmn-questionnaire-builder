'use strict';

// virtual-dom
var h         = require('virtual-dom/h');

// lodash
var assign    = require('lodash/assign'),
    cloneDeep = require('lodash/cloneDeep');

/**
 * Input component of type text with checkbox.
 */
function InputGroupCheckbox(parent, options) {
  console.log(options);

  this.parent      = parent;
  this.options     = options;

  this.oncheck     = this.options.oncheck;
  this.onremove    = this.options.onremove;
  this.placeholder = options.placeholder ? options.placeholder : '';

  this.initState = {
    value: '',
    checked: false
  };

  this.state = cloneDeep(this.initState);

}

InputGroupCheckbox.prototype.render = function(options) {

  var that = this;

  // Handler
  function updateValue(value) {
    that.update({
      value: value
    });
  }

  function updateChecked() {
    var checked = that.state.checked;

    that.oncheck(that);

    that.update({
      checked: checked ? false : true
    });
  }

  // Rendering
  var html = 
    h('div.input-group', [
      h('span.input-group-btn',
        h('button.btn.btn-secondary', {
          type: 'button',
          onclick: function() {
            updateChecked();
          },
          style: {
            height: "38px"
          }
        },
          this.state.checked ? h('i.fa.fa-check-circle-o') : h('i.fa.fa-circle-o')
        )
      ),
      h('input.form-control', {
        type: 'text',
        value: this.state.value.length ? this.state.value : '',
        placeholder: this.placeholder ? this.options.placeholder : '',
        onkeyup: function() {
          updateValue(this.value);
        },
        onblur: function() {
          updateValue(this.value);
        }
      }),
      h('span.input-group-btn',
        h('button.btn.btn-secondary', {
          type: 'button',
          onclick: function() {
            that.onremove(that);
          },
          disabled: options.disableRemove ? 'disabled' : '',
          style: {
            height: "38px"
          }
        },
          h('i.fa.fa-trash')
        )
      )
    ]);

  return html;
}

InputGroupCheckbox.prototype.update = function(options, equal) {

  // Always clone to prevent mutation
  options = cloneDeep(options);

  if(equal) {

    // Set state equal to options
    this.state = options;
  } else {
    
    // Update state
    assign(this.state, options);
  }

  this.parent.update({});

  console.log(this.state);
};

InputGroupCheckbox.prototype.reset = function() {
  
  // Reset global state to initial state
  this.update(this.initState, true);

};

module.exports = InputGroupCheckbox;