
    var Keybind = window.Keybind = {

        /* our lookup table */
        bindings: [],

        bind: function(code, fn) {

            this.bindings[code] = fn;

        },

        defaultAction: function() {},
        
        perform: function(code) {

            /* return function binded to key code. If there's no function
             * binded, return default function 
             */
            return this.bindings[code] || this.defaultAction;

        }

    };
