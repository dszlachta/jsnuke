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
