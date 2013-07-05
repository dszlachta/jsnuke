(function(){

    var self = window.Editor = {

      /* Temporary */  

      node: null,

      init: function(selector) {

          this.node = document.querySelector(selector);

      },

      getCode: function() {

          return this.node.value;

      }

    };


})();
