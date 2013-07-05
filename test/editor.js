//(function() {

    test('editor', function(){

        var selector = '#editor textarea';

       Editor.init(selector); 
       ok(Editor.node.isSameNode(document.querySelector(selector)), 'Selector matches');

       var test_code = 'var aaa';
       Editor.node.value = test_code;

       equal(Editor.getCode(), test_code, 'getCode()');

    });

//})();
