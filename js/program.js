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
     * Conteúdo original recebido no construtor.
     */
    rawcontent: '',

    /**
     * Vetor de instruções.
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
    init: function(content) {
        this.rawcontent = content || '';
        this.instructions = Program.parse(this.rawcontent);
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

        // TODO: a "verificação de equivalência forte entre os programas monolíticos" deve vir aqui
    }
};
