$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();

    $('button').button();
    $('#help') .button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});
    $('#verify').button('disable');

    var pr1Instr = [],  // instruções do programa 1
        pr2Instr = [];  // instruções do programa 2

    var checkProgramDefined = function() {
        var first  = (pr1Instr.length > 0),
            second = (pr2Instr.length > 0);

        $('#program1')[(first  ? 'remove' : 'add') + 'Class']('empty');
        $('#program2')[(second ? 'remove' : 'add') + 'Class']('empty');
        $('#verify').button((first && second) ? 'enable' : 'disable');
    };

    $('#program1').click(function() {
        showCreateProgramDialog(pr1Instr, function(program) {
            $('#program1').html(program.toString());
            pr1Instr = program.instructions.slice();
            checkProgramDefined();
        });
    });

    $('#program2').click(function() {
        showCreateProgramDialog(pr2Instr, function(program) {
            $('#program2').html(program.toString());
            pr2Instr = program.instructions.slice();
            checkProgramDefined();
        });
    });

    $('#verify').click(function() {
        EquivalenceVerification.firstStep(pr1Instr);
//        $('#loading').show();
//        var program1 = new Program(pr1Instr),
//            program2 = new Program(pr2Instr);

//        $('#verification-result').empty();

//        try {
//            program1.compareTo(program2, 'verification-result');
//        }
//        catch (e) {
//            //
//        }

//        $('#loading').fadeOut();
    });

    $('#about').click(function() { showAboutDialog(); });
    $('#help') .click(function() { showHelpDialog(); });



    var debug = function() {
        var a, i, j, k, l, m, p = [[],[]];
        for (i = 0; i < 2; ++i) {
            j = Math.ceil(Math.random() * 10);
            for (k = 0; k < j; ++k) {
                l = Math.floor(Math.random() * 2);
                m = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                a = [l, m, Math.ceil(Math.random() * j)];
                if (l) a.push(Math.ceil(Math.random() * 10));
                p[i][k] = SimpleInstruction.apply(SimpleInstruction.prototype, a);
            }
        }

        pr1Instr = p[0];
        pr2Instr = p[1];
        checkProgramDefined();
        $('#verify').click();
    };
    (function(i){if(i.indexOf('debug')>i.indexOf('?')){debug()}})(document.location.href);

});
