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
    var download = that.builder.questionnaire.state;

    var string = JSON.stringify(download);
    var blob = new Blob([string], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    this.href        = url;
    this.download    = "questionnaire.json";
  }

  // Rendering
  var html = [
    h('div.row', 
      h('div.col-md-12',
        h('a.btn.btn-primary.btn-block', {
          onclick: download
        }, 'Fragebogen speichern')
      )
    )
  ];

  return html;
};

module.exports = Download;