(function() {

    test('jsNuke', function(){

        var code = '(function(){ return true; })();';

        ok(nuke.run(code), 'run()');

    });

})();
