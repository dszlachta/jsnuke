(function() {

    test('console', function(){

        var selector = '#console';

        nuke.console.init(selector); 
        ok(nuke.console.node.isSameNode(document.querySelector(selector)), 'Selector matches');

        /* check pretty printing */
        nuke.console.log(1);
        var logRes = ($(nuke.console.node).find('span.number'))[0];
        ok(logRes, 'prettyPrint: number');
        equal(logRes.innerHTML, '1', 'logged out correct thing')

        /* check widget.expand */
        var content = $('<span id="test-expand">Test</span>'),
        expand = new Widget.Expand(nuke.console.node, 'label', content);

        var expandNode = $(nuke.console.node).find('div.expand');
        ok(expandNode[0], 'Expand widget constructor');

        var expandContent = $(expandNode).find('ul.content');
        ok(expandContent[0], 'Expand widget constructor: content node');

        ok(expandContent.find('li span#test-expand')[0], 'Single content added');

        var multiContent = [ content.clone().attr('id', 'content-one'), content.clone().attr('id', 'content-two') ];
        expand.populate(multiContent);
        ok( (expandContent.find('li span#content-one')[0] && expandContent.find('li span#content-two')[0]), 'Expand.populate');

        expand.toggle();

        notEqual(expandContent.css('display'), 'none', 'Toggle shows');

        expand.toggle();

        equal(expandContent.css('display'), 'none', 'Toggle hides');

        expandNode.find('button').click();

        notEqual(expandContent.css('display'), 'none', 'Toggle trigger works');

    });

})();
