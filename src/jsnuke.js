(function(){

    var self = window.nuke = {

        init: function() {

            nuke.console.init('#console');
            nuke.editor.init('#editor');

            var execFn = function() {

                nuke.execute(nuke.editor.getCode());

            };

            document.querySelector('button').onclick = execFn;

        },

        run: function(code) {

            return eval(code);

        },

        execute: function(code) {

            try {

                nuke.console.log(this.run(code));

            } 
            catch (e) {

                nuke.console.error(e);

            }

        }

    };


})();
