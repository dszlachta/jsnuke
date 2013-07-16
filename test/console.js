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

        /* check widget.expand */
        var content = $('<span id="test-expand">Test</span>'),
        expand = new Widget.Expand(Console.node, 'label', content);

        var expandNode = $(Console.node).find('div.expand');
        ok(expandNode[0], 'Expand widget constructor');

        var expandContent = $(expandNode).find('ul.content');
        ok(expandContent[0], 'Expand widget constructor: content node');

        ok(expandContent.find('li span#test-expand')[0], 'Single content added');

        var multiContent = [ content.clone().attr('id', 'content-one'), content.clone().attr('id', 'content-two') ];
        expand.populate(multiContent);
        ok( (expandContent.find('li span#content-one')[0] && expandContent.find('li span#content-two')[0]), 'Expand.populate');

        expand.toggle();

        equal(expandContent.css('display'), 'none', 'Toggle hides');

        expand.toggle();

        notEqual(expandContent.css('display'), 'none', 'Toggle shows');

        expandNode.find('button').click();

        equal(expandContent.css('display'), 'none', 'Toggle trigger works');

    });

})();
