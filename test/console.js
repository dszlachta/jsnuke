(function() {

    test('console', function(){

        var selector = '#console';

       Console.init(selector); 
       ok(Console.node.isSameNode(document.querySelector(selector)), 'Selector matches');

       /* check pretty printing */
       Console.log(1);
       var logRes = ($(Console.node).find('span.number'))[0];
       ok(logRes, 'prettyPrint: number');
       equal(logRes.innerHTML, '1', 'logged out correct thing')

    });

})();
