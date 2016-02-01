'use strict';

// virtual-dom
var h = require('virtual-dom/h');

function Download(app) {
  this.app = app;
}

Download.prototype.render = function(state) {

  // Rendering
  var html = [
    h('div.row', 
      h('div.col-md-12',
        h('button.btn.btn-primary.btn-block', 'Fragebogen speichern')
      )
    )
  ];

  return html;
};

module.exports = Download;