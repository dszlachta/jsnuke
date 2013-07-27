(function(){

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

    P.makeExpand = function(name, value) {

        var self = this,
            label = ['<span><var>', name, '</var> ', value, '</span>'].join(''),
            e = new Widget.Expand(null, $(label)[0], null);

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
                items.push(member[0] + ': ' + member[1]);

        }, Widget.Inspector);

        targetExpand = targetExpand || (this.mainExpand = new Widget.Expand(this.node, $(Console.prettyPrint.object(this.object), items)));
        targetExpand.populate(items);

    };

    P.appendTo = function(node) {

        node.appendChild(this.node);

    }

})();
