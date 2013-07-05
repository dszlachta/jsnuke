(function(){

    var self = window.Editor = {

      node: null,
      codeMirror: null,

      init: function(selector) {

          this.node = document.querySelector(selector);

          this.codeMirror = CodeMirror(this.node, {

              mode: 'javascript'

          });

      },

      getCode: function() {

          return this.codeMirror.getValue();

      },

      setCode: function(string) {

          this.codeMirror.setValue(string);

      }

    };


})();
