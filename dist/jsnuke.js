(function(){

    var self = window.Console = {

        node: null,
        list: null,
        itemTemplate: null,

        prettyPrint: {

            output: function(className, o) {

                return ['<span class="'+ className +'">', o, '</span>'].join('');

            },

            /*
            number: _.bind(this.output, this, 'number'),
            string: _.bind(this.output, this, 'string'),
            fn: _.bind(this.output, this, 'function'),
            */

            check: function(string) {

                var pp = this,
                    output,
                    methods = [ pp.number, pp.string, pp.fn ],
                    tests = [ 
                        (_.isNumber(Number(string)) && !_.isNaN(Number(string)) ),
                        _.isString(string),
                        _.isFunction(string),
                    ];

                tests.forEach(function(value, index){

                    if ( value ) 
                        output = methods[index].call(null, string);

                });

                return output || string;

            }            

        },

        insert: function(content) {

            var item = this.itemTemplate.cloneNode();

            item.innerHTML = content;

            $(this.list).prepend(item);

        },

        log: function(string) {

            this.insert(this.prettyPrint.check(string));

        },

        error: function(string) {

            this.log('Error: ' + string);

        },

        dir: function(obj) {

            _.each(obj, function(value, key) {

                

            });

        },

        init: function(selector) {

            this.node = document.querySelector(selector);
            this.list = document.createElement('ul');

            this.itemTemplate = document.createElement('li');

            /* Generate prettyPrint helper functions */
            var pp = this.prettyPrint;
            pp.number = _.bind(pp.output, pp, 'number');
            pp.string = _.bind(pp.output, pp, 'string');
            pp.fn = _.bind(pp.output, pp, 'function');

            this.node.appendChild(this.list);
        }
        
    };


})();
;(function(){

    var self = window.Editor = {

      node: null,
      codeMirror: null,

      init: function(selector) {

          this.node = document.querySelector(selector);

          this.codeMirror = CodeMirror(this.node, {

              mode: 'javascript',
              lineNumbers: true

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
;(function(){

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
