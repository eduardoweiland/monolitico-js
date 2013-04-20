/**
 * Diálogo utilizado para criação de um programa monolítico.
 */
function showCreateProgramDialog(callback) {
    var dialog = new ProgramDialog([], callback);


    $('#create-program .instruction-list li').click(function() {
        var wasSelected = $(this).hasClass('selected');
        $('.instruction-list li.selected').removeClass('selected');
        if (!wasSelected) {
            $(this).addClass('selected');
        }
    });
}

/**
 * Janela com informações sobre os desenvolvedores do MonoliticoJS.
 */
function showAboutDialog() {
    $('<div id="dialog-about" title="MonoliticoJS">' +
        '<h3>Criado por</h3>' +
        '<p><a href="http://eduardoweiland.info">Eduardo Weiland</a></p>' +
        '<p><a href="http://www.tcardosoti.com.br">Thiago Cardoso</a></p>' +
        '<br/><h3>Tecnologia</h3>' +
        '<p>MonoliticoJS foi criado utilizando a linguagem Javascript e as bibliotecas ' +
        '<a href="http://jquery.com">jQuery</a> e <a href="http://jqueryui.com">jQueryUI</a>.</p></div>')
    .dialog({
        show: 'fade',
        hide: 'fade',
        resizable: false,
        modal: true,
        width: '40%',
        close: function() { $(this).remove(); },
        buttons: [{
            text: 'OK',
            click: function() { $(this).dialog('close'); }
        }]
    });
}

/**
 * Janela com os tópicos de ajuda para usuários do MonoliticoJS.
 */
function showHelpDialog() {
    window.open('help.html', '_blank',
        'width=430,height=630,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no');
}
