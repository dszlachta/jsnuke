(function(){

    var self = window.Console = {

        node: null,
        list: null,
        itemTemplate: null,

        init: function(selector) {

            this.node = document.querySelector(selector);
            this.list = this.node.querySelector('ul');

            this.itemTemplate = document.createElement('li');

        },

        log: function(string) {

            var item = this.itemTemplate.cloneNode();

            item.innerHTML = string;

            this.list.appendChild(item);

        },

        error: function(string) {

            this.log('Error: ' + string);

        }

    };


})();
;(function(){

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
;(function(){

    var self = window.jsNuke = {

        init: function() {

            Console.init('#console');
            Editor.init('#editor textarea');

            document.querySelector('button').onclick = function() {

                jsNuke.execute(Editor.getCode());

            };

        },

        run: function(code) {

            return eval(code);

        },

        execute: function(code) {

            try {

                Console.log(this.run(code));

            } 
            catch (e) {

                Console.error(e);

            }

        }

    };


})();
