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

function Program() {
    this.init.apply(this, arguments);
}

// -- static -- Propriedades e métodos estáticos da classe

/**
 * Analisa o conteúdo de @a content e retorna um vetor de Instruction's
 * existentes.
 *
 * @param String conteúdo a ser analisado.
 * @return Array Vetor de Instruction's analisadas presentes no programa.
 *
 * @public
 * @static
 */
Program.parse = function(content) {
    var lines = content.split('\n'),
        instructions = [], i;

    for (i = 0; i < lines.length; ++i) {
        instructions.push(new Instruction(lines[i]));
    }

    return instructions;
};

// -- prototype -- Propriedades e métodos acessíveis pelo objeto
Program.prototype = {

    /**
     *
     * Armazena todas as instruções rotuladas do programa. Os dados são
     * armazenados como objetos do tipo Instruction.
     */
    instructions: [],

    /**
     * Cria um novo programa monolítico a partir de um conjunto de instruções
     * rotuladas compostas. No primeiro momento, são aceitas apenas instruções
     * abreviadas no formato 1:(F,2),(G,3)
     *
     * @param String content O conteúdo do programa, definido em instruções
     *        rotuladas compostas no formato abreviado.
     */
    init: function(simpleInstructions) {
        // Array de CompoundInstruction's
        this.instructions = [];

        if (!$.isArray(simpleInstructions)) {
            throw new TypeError('Invalid instructions set');
        }

        for (var i = 0; i < simpleInstructions.length; ++i) {
            // TODO...
        }
    },

    /**
     * Verifica se o programa como está definido atualmente é válido
     * estuturalmente.
     *
     * @return Boolean Se o programa é válido ou não.
     *
     * @public
     */
    isValid: function() {
        var valid = false,
            ln = this.instructions.length,
            i;

        if (ln !== 0) {
            valid = true;
            for (i = 0; i < ln; ++i) {
                valid = valid && this.instructions[i].isValid();
            }
        }

        // TODO: verificar se não há rótulos repetidos
        // TODO: verificar se a última instrução é a instrução de formalização
        //   `- TODO: verificar se é realmente obrigatório a instrução de formalização

        return valid;
    },

    /**
     * Método que realiza a verificação de equivalência.
     *
     * A verificação será feita considerando-se que o programa this vêm antes do
     * programa @a other.
     *
     * @param Program other Outro programa com o qual esse será comparado.
     * @param Boolean verbose Se deve ser exibido o passo-a-passo da verificação.
     *
     * @return Boolean Retorna true se os programas forem equivalentes, false em
     *  caso contrário. (Obs.: false também pode significar que um dos programas
     *  era inválido).
     *
     * @public
     */
    compareTo: function(other, verbose) {
        // Não realiza a verificação se um dos programas for inválido.
        if (!this.isValid() || !other.isValid()) {
            return false;
        }

        // a última instrução (de formalização) de cada programa é descartada
        var first  = this.instructions.slice(0, -1),
            second = other.instructions.slice(0, -1);

        // TODO: a "verificação de equivalência forte entre os programas monolíticos" deve vir aqui
    }
};
