$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();
    $('#loading').fadeOut();

    $('button').button();
    $('#help').button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});

    var program1instructions = [];
    $('#program1').click(function() {
        showCreateProgramDialog(program1instructions, function(program) {
            $('#program1').html(program.toString());
            program1instructions = program.instructions.slice();
        });
    });
    var program2instructions = [];
    $('#program2').click(function() {
        showCreateProgramDialog(program2instructions, function(program) {
            $('#program2').html(program.toString());
            program2instructions = program.instructions.slice();
        });
    });
    $('#verify').button('disable');

    $('#about').click(function() { showAboutDialog(); });
    $('#help') .click(function() { showHelpDialog(); });
});
