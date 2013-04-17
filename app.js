$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();
    $('#loading').fadeOut();

    $('button').button();
    $('#help').button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});

    $('#program1').click(function() {
        showCreateProgramDialog(function(program) {
            $('#program1').html(program);
        });
    });
    $('#program2').click(function() {
        showCreateProgramDialog(function(program) {
            $('#program2').html(program);
        });
    });
    $('#verify').button('disable');

    $('#about').click(function() { showAboutDialog(); });
    $('#help') .click(function() { showHelpDialog(); });
});
