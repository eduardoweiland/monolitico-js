$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();
    $('#loading').fadeOut();

    $('button').button();
    $('#help') .button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});

    $('#verify').button('disable');
    $('#verify').click(function() {
        $('#loading').show();
    });

    var pr1Instr = [],  // instruções do programa 1
        pr2Instr = [];  // instruções do programa 2

    var checkProgramDefined = function() {
        var first  = (pr1Instr.length > 0),
            second = (pr2Instr.length > 0);

        $('#program1')[(first  ? 'remove' : 'add') + 'Class']('empty');
        $('#program2')[(second ? 'remove' : 'add') + 'Class']('empty');
        $('#verify').button(first && second ? 'enable' : 'disable');
    }

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

    $('#about').click(function() { showAboutDialog(); });
    $('#help') .click(function() { showHelpDialog(); });
});
