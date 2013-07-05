(function() {

    test('jsNuke', function(){

        var code = '(function(){ return true; })();';

        ok(jsNuke.run(code), 'run()');

    });

})();
