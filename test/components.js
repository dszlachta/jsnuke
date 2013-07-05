(function() {

    test('components', function(){

        ['Console', 'Editor', 'jsNuke'].forEach(function(component) {

            equal(typeof window[component], 'object', component + ' present');

        })

    });

})();
