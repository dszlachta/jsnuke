(function(){

    var self = window.nuke = {

        exec_time: null,

        init: function() {

            nuke.console.init('#console');
            nuke.editor.init('#editor');

            var execFn = function() {

                nuke.execute(nuke.editor.getCode());

            };

            document.querySelector('button').onclick = execFn;

        },

        run: function(code) {

            var return_value,
                start,
                stop;

            start = new Date();

            var return_value = eval(code);

            stop = new Date();

            nuke.exec_time = stop-start;

            return return_value;

        },

        execute: function(code) {

            try {

                nuke.console.log(this.run(code));

            } 
            catch (e) {

                nuke.console.error(e);

            }

            this.exec_time = 0;

        },

        extract: {

            fn: function(string) {

                var data = string.match(/(\w*)(\([\w, ]*\))/),
                    fname = data[1] || 'function',
                    args = data[2];

                return {

                    name: fname,
                    args: args

                };

            }

        }

    };


})();
