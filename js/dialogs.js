/**************************************************************************
 *  This file is part of MonoliticoJS                                     *
 *  Copyright (C) 2013 Eduardo Weiland and Thiago Cardoso                 *
 *                                                                        *
 *  This program is free software: you can redistribute it and/or modify  *
 *  it under the terms of the GNU General Public License as published by  *
 *  the Free Software Foundation, either version 3 of the License, or     *
 *  (at your option) any later version.                                   *
 *                                                                        *
 *  This program is distributed in the hope that it will be useful,       *
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *  GNU General Public License for more details.                          *
 *                                                                        *
 *  You should have received a copy of the GNU General Public License     *
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>  *
 **************************************************************************/

/**
 * Diálogo utilizado para criação de um programa monolítico.
 */
function showCreateProgramDialog(instructions, callback) {
    return new ProgramDialog(instructions, callback);
}

/**
 * Janela com informações sobre os desenvolvedores do MonoliticoJS.
 */
function showAboutDialog() {
    $('<div id="dialog-about" title="MonoliticoJS">' +
        '<h3>Licença</h3>' +
        '<img src="images/gplv3.png" style="float:left;margin: 5px 10px 0 0">' +
        '<p><span class="monolitico">MonoliticoJS</span> é software livre. Você ' +
        'pode redistribuí-lo e/ou modificá-lo sob os termos da Licença Pública ' +
        'Geral GNU, conforme publicada pela Free Software Foundation; tanto a ' +
        'versão 3 da Licença como (a seu critério) qualquer versão mais nova.</p>' +
        '<p><span class="monolitico">MonoliticoJS</span> é distribuído na ' +
        'expectativa de ser útil, mas SEM QUALQUER GARANTIA; sem mesmo a garantia ' +
        'implícita de COMERCIALIZAÇÃO ou de ADEQUAÇÃO A QUALQUER PROPÓSITO EM ' +
        'PARTICULAR. <a href="http://www.gnu.org/licenses/gpl.html" title="Licença ' +
        'Pública Geral GNU" rel="license">Consulte a Licença Pública Geral GNU</a> ' +
        'para obter mais detalhes.</p>' +
        '<br/><h3>Criado por</h3>' +
        '<p><a href="http://eduardoweiland.info">Eduardo Weiland</a></p>' +
        '<p><a href="http://www.tcardosoti.com.br">Thiago Cardoso</a></p>' +
        '<br/><h3>Tecnologia</h3>' +
        '<p><span class="monolitico">MonoliticoJS</span> foi criado utilizando ' +
        'a linguagem Javascript e as bibliotecas <a href="http://jquery.com">' +
        'jQuery</a> e <a href="http://jqueryui.com">jQueryUI</a>.</p></div>')
    .dialog({
        show: 'fade',
        hide: 'fade',
        resizable: false,
        modal: true,
        width: '60%',
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
