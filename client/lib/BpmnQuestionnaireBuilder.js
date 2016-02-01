'use strict';

// virtual-dom
var h             = require('virtual-dom/h');

// main-loop
var mainLoop      = require('main-loop');

// lodash
var assign        = require('lodash/assign'),
    cloneDeep     = require('lodash/cloneDeep');

// Components
var Download      = require('./components/Download.js'),
    Questionnaire = require('./components/Questionnaire.js'),
    Question      = require('./components/Question.js');

/**
 * Builder component.
 */
function BpmnQuestionnaireBuilder(options) {

  // Global app state initialization
  this.initState = {
    name: ''
  };

  // Set state to initial state by cloning instead of referencing
  this.state = cloneDeep(this.initState);

  // Set up loop
  this.loop = mainLoop(this.state, this.render.bind(this), {
    create: require("virtual-dom/create-element"),
    diff:   require("virtual-dom/diff"),
    patch:  require("virtual-dom/patch")
  });

  // Check if container element was specified
  if (!options.container) {
    throw new Error('No container element specified');
  }

  // Append questionnaire to container element
  if (typeof options.container === 'string') {

    // Search for element with given ID
    var container = document.getElementById(options.container);

    // Error handling
    if (!container) {
      throw new Error('Container element not found');
    }
    
    this.container = container;
  } else if (options.container.appendChild) {

    // Append questionnaire
    this.container = options.container;
  } else {
    throw new Error('Container element not found');
  }

  // Append questionnaire
  this.container.appendChild(this.loop.target);

}

BpmnQuestionnaireBuilder.prototype.render = function() {

  return h('div.app', [
    new Questionnaire(this).render(this.state),
    h('hr'),
    new Question(this).render(this.state),
    h('hr'),
    new Download(this).render(this.state)
  ]);

};

BpmnQuestionnaireBuilder.prototype.update = function(options, equal) {

  // Always clone to prevent mutation
  options = cloneDeep(options);

  if(equal) {

    // Set state equal to options
    this.state = options;
  } else {
    
    // Update state
    assign(this.state, options);
  }

  // Finally push updated state to main-loop
  this.loop.update(this.state);

  console.log(this.state);
};

BpmnQuestionnaireBuilder.prototype.resetApp = function() {

  // Reset global state to initial state
  this.update(this.initState, true);

}

module.exports = BpmnQuestionnaireBuilder;