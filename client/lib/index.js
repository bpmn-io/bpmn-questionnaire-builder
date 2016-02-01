'use strict';

// domReady
var domReady = require('domready');

// lodash

// Components
var App      = require('./app/app.js');

// Utils

domReady(function () {
  
  var app = new App({
    container: 'container'
  });

});