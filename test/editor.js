//(function() {

    test('editor', function(){

        var selector = '#editor';

       nuke.editor.init(selector); 
       ok(nuke.editor.node.isSameNode(document.querySelector(selector)), 'Selector matches');

       var test_code = 'var aaa';
       nuke.editor.setCode(test_code);

       equal(nuke.editor.getCode(), test_code, 'getCode()');

    });

//})();
