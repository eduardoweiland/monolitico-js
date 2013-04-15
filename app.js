$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();
    $('#loading').fadeOut();

    $('button').button();
    $('#help').button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});

    $('#create-program').dialog({
        width: 760,
        height: 420,
        show: 'fade',
        hide: 'fade',
        resizable: false,
        modal: true,
        autoOpen: false,
        buttons: [{
            text: 'Cancelar',
            click: function() {
                $(this).dialog('close');
            }
        },{
            text: 'OK',
            click: function() {
                // definir programa...
                $(this).dialog('close');
            }
        }]
    });

    $('#program1').click(function() {
        $('#create-program').dialog('open')
    });
    $('#program2').click(function() {
        $('#create-program').dialog('open')
    });
    $('#verify').button('disable');

    $('#about').click(function() { alert('FALTA IMPLEMENTAR!!!!'); });
    $('#help').click(function() { alert('FALTA IMPLEMENTAR!!!!'); });
});
