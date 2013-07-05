(function() {

    test('console', function(){

        var selector = '#console';

       Console.init(selector); 
       ok(Console.node.isSameNode(document.querySelector(selector)), 'Selector matches');

    });

})();
