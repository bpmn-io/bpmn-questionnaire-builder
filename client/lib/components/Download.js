'use strict';

// virtual-dom
var h = require('virtual-dom/h');

function Download(builder) {
  this.builder = builder;
}

Download.prototype.render = function(state) {

  var that = this;

  // Handler
  function download() {

    // TODO Add validation
    var download = that.builder.exportJSON();

    var string = JSON.stringify(download, null, '\t');
    var blob = new Blob([string], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    this.href = url;
    this.download = "questionnaire.json";
  }

  // Rendering
  var html = [
    h('div.row',
      h('div.col-md-12',
        h('h2', 'Download')
      )
    ),
    h('hr'),
    h('div.row', 
      h('div.col-md-12',
        h('a.btn.btn-primary-outline.btn-block', {
          onclick: download
        }, 'Fragebogen speichern')
      )
    )
  ];

  return html;
};

module.exports = Download;