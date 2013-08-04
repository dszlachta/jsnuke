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
;(function(){

    var self = window.nuke.editor = {

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
;(function() {

    window.Widget = window.Widget || {};

    window.Widget.Expand = function(parent, label, content) {

        var self = this;

        this.node = $('<div class="widget expand">')[0];
        this.contentNode = $('<ul class="content">')[0];

        this.expandTrigger = $('<button type="button" class="trigger">+</button>').on('click', function() {

            self.onExpand.call(self);
            self.toggle();

        });

        $(this.node).append(this.expandTrigger).append(label);

        if (content) 
            this.populate(content);
        
        $(this.node).append(this.contentNode);

        /* Contents should be hidden by default */
        $(this.contentNode).hide();
        
        if (parent) 
            this.appendTo(parent);
        
    };

    var P = window.Widget.Expand.prototype;

    P.onExpand = function() {};

    P.appendTo = function(node) {

        node.appendChild(this.node);

    };

    P.add = function(content) {

        var i = $('<li>');

        i.clone().append(content).appendTo(this.contentNode);

    };

    P.populate = function(content) {

        var self = this;

        if (_.isArray(content)) {

            content.forEach(function(value){

                self.add(value);

            });

        }
        else
            this.add(content);


    };

    P.clear = function() {

        var n;

        while ( (n = this.contentNode.firstChild) )
            n.parentNode.removeChild(n);

    };

    P.show = function() {

        $(this.contentNode).show();
        return this.hide;

    };

    P.hide = function() {

        $(this.contentNode).hide();
        return this.show;

    };

    P.toggleProxy = P.show;

    P.toggle = function() {

        this.toggleProxy = this.toggleProxy();

    };

})();
;(function(){

    'use strict';

    window.Widget = window.Widget || {};

    window.Widget.Inspector = function(object, parent) {

        this.node = $('<div class="widget inspector"></div>')[0];
        this.object = object,
        this.mainExpand = undefined,
        this.expands = [];

        this.build(this.inspect());

        if (parent) 
            this.appendTo(parent);

    };

    var P = window.Widget.Inspector.prototype;

    P.inspect = function(object) {

        object = object || this.object;
        return _.pairs(object);

    },

    /*
    P.objName = function(object) {

        return (object.toString()).match(/\[object (\w*)\]/)[1];

    };

    P.formatName = function(name, type) {

        var n = $('<span class="member">'+name+'</span>: <span class="object">'+type+'</span>');
        return n[0];

    };
    */

    P.format = function(name, value) {

        return ['<span><var>', name, '</var> ', value, '</span>'].join('');

    },

    P.makeExpand = function(name, value) {

        var self = this,
            label = $(this.format(name, value))[0],
            e = new Widget.Expand(null, label, null);

        e.onExpand = function(){

            this.clear();
            self.build(self.inspect(value), this);

        };

        this.expands.push(e);

        return e;

    };

    P.build = function(data, targetExpand) {

        var self = this,
            items = [];

        data.forEach(function(member){

            if (_.isObject(member[1])) 
                items.push(self.makeExpand(member[0], member[1]).node);
            else
                items.push(self.format(member[0], member[1]));

        }, Widget.Inspector);

        targetExpand = targetExpand || (this.mainExpand = new Widget.Expand(this.node, $(nuke.console.prettyPrint.check(this.object), items)));
        targetExpand.populate(items);

    };

    P.appendTo = function(node) {

        node.appendChild(this.node);

    }

})();
;(function(){

    var self = window.nuke.console = {

        node: null,
        list: null,
        itemTemplate: null,

        prettyPrint: {

            output: function(className, o) {

                return ['<span class="'+ className +'">', o, '</span>'].join('');

            },

            /*
             * number() and string() methods are generated by
             * Console.init()
            */

           object: function(obj) {

              var name = nuke.extract.fn(obj.constructor.toString()).name;

              return '<span class="object">' + name + '</span>';

           },

           fn: function(fn) {

                var data = nuke.extract.fn(fn.toString());

                return this.output('function', data.name + (' <code class="arguments">' + data.args + '</code>') );

           },

            check: function(something) {

                var pp = this,
                    output,
                    methods = [ pp.number, pp.string, pp.fn, pp.object ],
                    tests = [ 
                        (_.isNumber(Number(something)) && !_.isNaN(Number(something)) ),
                        _.isString(something),
                        (_.isFunction(something) && typeof something == 'function'),
                        (_.isObject(something) && typeof something != 'function'),
                    ],
                    l = tests.length;

                while(l--) {

                    if ( tests[l] ) {

                        output = methods[l].call(pp, something);
                        break;

                    }

                };

                return $(output)[0] || something;

            }            

        },

        insert: function(content) {

            var item = this.itemTemplate.cloneNode();

            if (content === undefined) 
                content = 'undefined';

            if (content instanceof Node) 
                item.appendChild(content);
            else
                item.textValue = content;

            var info = $('<p class="info">' + nuke.exec_time + 'ms</p>');

            $(item).append(info);

            $(this.list).prepend(item);

        },

        log: function(something) {

            if (_.isObject(something))
                this.dir(something);
            else
                this.insert(this.prettyPrint.check(something));

        },

        dir: function(object) {

            this.insert(new Widget.Inspector(object, undefined).node);

        },

        error: function(string) {

            this.log('Error: ' + string);

        },

        init: function(selector) {

            this.node = document.querySelector(selector);
            this.list = document.createElement('ul');

            this.itemTemplate = document.createElement('li');

            /* Generate prettyPrint helper functions */
            var pp = this.prettyPrint;
            pp.number = _.bind(pp.output, pp, 'number');
            pp.string = _.bind(pp.output, pp, 'string');
            //pp.fn = _.bind(pp.output, pp, 'function');

            this.node.appendChild(this.list);

        }
        
    };


})();
