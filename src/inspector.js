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

    P.format = function(name, value) {

        //return ['<div class="member"><var>', name, '</var><span>', value, '</span></div>'].join('');
        //return ['<span class="member"><var>', name, '</var><span class="value">', value, '</span></span>'].join('');

        return $('<span class="member"><var>' + name + '</var></span>');

    },

    P.makeExpand = function(value, label) {

        var self = this,
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
            items = [],
            formatted,
            value;

        data.forEach(function(member){

            value = nuke.console.prettyPrint.check(member[1]);
            formatted = self.format(member[0]);
            $(formatted).append(value);

            if (_.isObject(member[1])) 
                items.push(self.makeExpand(member[1], formatted).node);
            else
                items.push(formatted);

        }, Widget.Inspector);

        targetExpand = targetExpand || (this.mainExpand = new Widget.Expand(this.node, $(nuke.console.prettyPrint.check(this.object), items)));
        targetExpand.populate(items);

    };

    P.appendTo = function(node) {

        node.appendChild(this.node);

    }

})();
