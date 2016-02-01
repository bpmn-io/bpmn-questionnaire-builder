'use strict';

// virtual-dom
var h         = require('virtual-dom/h');

// main-loop
var mainLoop  = require('main-loop');

// lodash
var cloneDeep = require('lodash/cloneDeep');

/**
 * App component.
 */
function App(options) {

  // Global app state initialization
  this.initState = {
    questionnaireJson: {}
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

App.prototype.render = function() {

  return h('div.app', [
    h('h1', 'Erstelle deinen eigenen Fragebogen!')
  ]);

};

module.exports = App;