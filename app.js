$(function() {
    $('#loading').fadeOut();

    $('button').button();

    $('#create-program').dialog({
        width: 830,
        height: 420,
        show: 'fade',
        hide: 'fade',
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
});
