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

$(function() {
    // oculta as mensagens que são exibidas se o JS estiver desabilitado e exibe o programa
    $('.nojs').hide();
    $('.js').fadeIn();

    $('button').button();
    $('#help') .button('option', 'icons', {primary: 'ui-icon-help'});
    $('#about').button('option', 'icons', {primary: 'ui-icon-info'});
    $('.step-title').tooltip({position: {my: 'right top', at: 'right bottom'}});
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
        $('#loading').fadeIn();

        try {
            var prog1firstStep = EquivalenceVerification.firstStep(pr1Instr),
                prog2firstStep = EquivalenceVerification.firstStep(pr2Instr);
            $('#first-step .box.left') .html(prog1firstStep.join('<br/>'));
            $('#first-step .box.right').html(prog2firstStep.join('<br/>'));
            $('#first-step').fadeIn();
            $('html,body').animate({ scrollTop: $(document).height() }, 'slow');

            var prog1secondStep = EquivalenceVerification.secondStep(prog1firstStep),
                prog2secondStep = EquivalenceVerification.secondStep(prog2firstStep);
            $('#second-step .box.left') .html(prog1secondStep.join('<br/>'));
            $('#second-step .box.right').html(prog2secondStep.join('<br/>'));
            $('#second-step').fadeIn();
            $('html,body').animate({ scrollTop: $(document).height() }, 'slow');

            var prog1thirdStep = EquivalenceVerification.thirdStep(prog1firstStep, prog1secondStep[prog1secondStep.length - 1]),
                prog2thirdStep = EquivalenceVerification.thirdStep(prog2firstStep, prog2secondStep[prog2secondStep.length - 1]);
            $('#third-step .box.left').html(prog1thirdStep.join('<br/>'));
            $('#third-step .box.right').html(prog2thirdStep.join('<br/>'));
            $('#third-step').fadeIn();

            $('html,body').animate({ scrollTop: $(document).height() }, 'slow');
        }
        catch (e) {
            alert('Erro ao analisar programa:\n' + e.message);
        }

        $('#loading').fadeOut();
    });

    $('#about').click(function() { showAboutDialog(); });
    $('#help') .click(function() { showHelpDialog(); });



    var debug = function() {
        $('.step').show();
    };
    (function(i){if(i.indexOf('debug')>i.indexOf('?')){debug()}})(document.location.href);

});
