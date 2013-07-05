(function(){

    var self = window.jsNuke = {

        init: function() {

            Console.init('#console');
            Editor.init('#editor');

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
