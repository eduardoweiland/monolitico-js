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

function SimpleInstruction() {
    this.init.apply(this, arguments);
}

SimpleInstruction.TYPE_OPERATION = 0;
SimpleInstruction.TYPE_TEST      = 1;

SimpleInstruction.prototype = {

    /**
     * Tipo da instrução representada por esse objeto.
     * @type Number
     */
    type: null,

    /**
     * Operação executada nessa instrução. Válido apenas quando o tipo for
     * operação.
     * @type String
     */
    operation: null,

    /**
     * Rótulo ao qual o programa será redirecionado após executar a operação.
     * Válido apenas quando o tipo for operação.
     * @type Number
     */
    nextLabel: null,

    /**
     * Nome do teste a ser executado. Válido apenas quando o tipo for teste.
     * @type String
     */
    testName: null,

    /**
     * Rótulo ao qual o programa será redirecionado quando o teste for verdadeiro.
     * Válido apenas quando o tipo for teste.
     * @type Number
     */
    trueLabel: null,

    /**
     * Rótulo ao qual o programa será redirecionado quando o teste for falso.
     * Válido apenas quando o tipo for teste.
     * @type Number
     */
    falseLabel: null,

    /**
     * Construtor. Criar um nova instrução simples do tipo @a type.
     *
     * Os parâmetros aceitos pelo construtor variam de acordo com o tipo de
     * instrução sendo criada.
     *
     * Para criar uma instrução do tipo operação:
     * @param String operation Nome da operação a ser executada
     * @param Number nextLabel Rótulo a ser seguido após a operação
     *
     * Para criar uma instrução do tipo teste:
     * @param String testName   Nome do teste a ser executado
     * @param Number trueLabel  Rótulo a ser seguido se o teste for verdadeiro
     * @param Number falseLabel Rótulo a ser seguido se o teste for falso
     */
    init: function(type) {
        if (type === SimpleInstruction.TYPE_OPERATION && arguments.length === 3) {
            this.operation = arguments[1];
            this.nextLabel = parseInt(arguments[2]);
        }
        else if (type === SimpleInstruction.TYPE_TEST && arguments.length === 4) {
            this.testName   = arguments[1];
            this.trueLabel  = parseInt(arguments[2]);
            this.falseLabel = parseInt(arguments[3]);
        }
        else {
            throw new Error("Invalid instruction type.");
        }

        this.type = type;
    },

    toString: function() {
        if (this.type === SimpleInstruction.TYPE_OPERATION) {
            return 'faça ' + this.operation + ' vá_para ' + this.nextLabel;
        }
        else if (this.type === SimpleInstruction.TYPE_TEST) {
            return 'se ' + this.testName + ' então vá_para ' + this.trueLabel + ' senão vá_para ' + this.falseLabel;
        }
    }
}

/// Define uma instrução fake para ser utilizada como partida
SimpleInstruction.START = new SimpleInstruction(SimpleInstruction.TYPE_OPERATION, '', '1');
