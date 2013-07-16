(function(){

    var self = window.jsNuke = {

        init: function() {

            Console.init('#console');
            Editor.init('#editor');

            var execFn = function() {

                jsNuke.execute(Editor.getCode());

            };

            document.querySelector('button').onclick = execFn;

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
