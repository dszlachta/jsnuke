(function() {

    test('components', function(){

        ['nuke', 'Widget'].forEach(function(ns) {

            equal(typeof window[ns], 'object', ns + ' present');

        });

        ['console', 'editor'].forEach(function(component) {

            equal(typeof window.nuke[component], 'object', component + ' present');

        })

    });

})();
