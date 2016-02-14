'use strict';

// virtual-dom
var h = require('virtual-dom/h');

function ModalConfirm(parent, options) {
  this.parent = parent;
  this.options = options;
}

ModalConfirm.prototype.render = function() {
  
  var that = this;

  // Handler
  function closeModal() {
    that.parent.update({
      showModal: false
    });
  }

  var html = 
    h('div.modal',
      h('div.modal-dialog',
        h('div.modal-content', [
          h('div.modal-header',
            h('h4.modal-title', this.options.title)
          ),
          h('div.modal-body', this.options.body),
          h('div.modal-footer', [
            h('button.btn.btn-secondary-outline', {
              onclick: closeModal
            }, 'Abbrechen'),
            h('button.btn.btn-primary-outline', {
              onclick: function() {
                that.options.onconfirm();
              }
            },'Fortfahren')
          ])
        ])
      )
    );

  return html;
}

module.exports = ModalConfirm;