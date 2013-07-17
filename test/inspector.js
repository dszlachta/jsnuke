(function() {

    test('inspector', function(){

        ok(Widget.Inspector, 'Inspector present');

        var $qfixture = $('#qunit-fixture'),
            object = {

                stringValue: 'string value',
                numValue: 1,
                fn: function(a, b) {},
                anotherObject: {

                    present: true

                }

            },
            oname = (object.toString()).match(/\[object (\w*)\]/)[1],
            inspector = new Widget.Inspector(object, $qfixture[0]),
            $inspectorNode = $qfixture.find('div.inspector'),
            $expandNode = $inspectorNode.find('div.expand');

        ok($inspectorNode[0], 'constructed html');
        ok($expandNode[0], 'expand present');
        

    });

})();
