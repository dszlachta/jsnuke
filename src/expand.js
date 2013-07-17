(function() {

    window.Widget = window.Widget || {};

    window.Widget.Expand = function(parent, label, content) {

        var self = this;

        this.node = $('<div class="widget expand">')[0];
        this.contentNode = $('<ul class="content">')[0];

        this.expandTrigger = $('<button type="button">+</button>').on('click', function() {

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
