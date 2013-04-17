/**
 * !! CLASSE INTERNA !!
 * Cria um diálogo simples com as configurações padrão do MonoliticoJS.
 */
function __SimpleDefaultDialog__(content) {
    return $(content).dialog({
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
 * Diálogo utilizado para criação de um programa monolítico.
 */
function showCreateProgramDialog(callback) {
    $('<div id="create-program" title="Criar programa monolítico" class="js">' +
        '<div class="create-instruction">' +
            '<div id="add-operation">' +
                '<input type="radio" name="instruction-type" id="operation"><label for="operation">Operação</label><br/>' +
                'faça <input type="text"> vá_para <input type="text"><br/>' +
            '</div>' +
            '<div id="add-condition">' +
                '<input type="radio" name="instruction-type" id="condition"><label for="condition">Condição</label><br/>' +
                'se <input type="text"> então vá_para <input type="text"> senão vá_para <input type="text">' +
            '</div>' +
            '<button id="">HAHA</button>' +
        '</div>' +
        '<ul class="instruction-list empty">Nenhuma instrução adicionada</ul>' +
    '</div>').dialog({
        show: 'fade',
        hide: 'fade',
        resizable: false,
        modal: true,
        width: 760,
        height: 420,
        close: function() { $(this).remove(); },
        buttons: [{
            text: 'Cancelar',
            click: function() { $(this).dialog('close'); }
        },{
            text: 'OK',
            click: function() {
                if (typeof callback === 'function') {
                    callback('blablabla');
                }
                $(this).dialog('close');
            }
        }]
    });

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
    __SimpleDefaultDialog__('<div id="dialog-about" title="MonoliticoJS">' +
        '<h3>Criado por</h3>' +
        '<p><a href="http://eduardoweiland.info">Eduardo Weiland</a></p>' +
        '<p><a href="http://www.tcardosoti.com.br">Thiago Cardoso</a></p>' +
        '<br/><br/><h3>Tecnologia</h3>' +
        '<p>MonoliticoJS foi criado utilizando a linguagem Javascript e as bibliotecas ' +
        '<a href="http://jquery.com">jQuery</a> e <a href="http://jqueryui.com">jQueryUI</a>.</p></div>');
}

/**
 * Janela com os tópicos de ajuda para usuários do MonoliticoJS.
 */
function showHelpDialog() {
    window.open('help.html', '_blank',
        'width=430,height=630,menubar=no,location=no,resizable=yes,scrollbars=yes,status=no');
}
