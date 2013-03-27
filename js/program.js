function Program() {
    this.init.apply(this, arguments);
}

// -- closure -- Variáveis privadas da classe Program
(function() {

var rawcontent = ''; // conteúdo original do programa (como recebido no construtor)

Program.prototype = {

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
     *        rotuladas compostas no formato abreviado
     */
    init: function(content) {
        rawcontent = content || '';
        this.instructions = Program.parse(rawcontent);
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
        if (rawcontent) {
            // TODO: validação
            return true;
        }

        return false;
    },

    /**
     * Analisa o conteúdo de @a content e retorna um vetor de Instruction's
     * existentes.
     *
     * @param String conteúdo a ser analisado.
     * @return Vetor de Instruction's analisadas presentes no programa.
     *
     * @public
     * @static
     */
    parse: function(content) {
        var lines = content.split('\n'),
            instructions = [], i;

        for (i = 0; i < lines.length; ++i) {
            instructions.push(new Instruction(lines[i]));
        }

        return instructions;
    }
}

})();   // -- end Program closure
