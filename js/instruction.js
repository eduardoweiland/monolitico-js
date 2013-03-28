function Instruction() {
    this.init.apply(this, arguments);
}

// -- closure -- Variáveis privadas da classe Program
(function() {

var rawcontent = ''; // conteúdo original do programa (como recebido no construtor)
var validRe = /([0-9w&]+):\((.+),([0-9w&]+)\),\((.+),([0-9w&]+)\)/;

// -- static -- Propriedades e métodos estáticos da classe

Instruction.TYPE_OPERATION    = 1;  // instrução comum (testes e operações, sem ciclos nem paradas)
Instruction.TYPE_STOP         = 2;  // instrução que contém uma parada
Instruction.TYPE_CYCLE        = 3;  // instrução que contém um ciclo
Instruction.TYPE_FORMAL_STOP  = 4;  // instrução de parada para formalização (final do programa)
Instruction.TYPE_FORMAL_CYCLE = 5;  // instrução de ciclo para formalização (final do programa)

Instruction.LABEL_STOP_VALUE  = '&';
Instruction.LABEL_CYCLE_VALUE = 'w';

Instruction.LABEL_STOP_UTF8   = 'ε';
Instruction.LABEL_CYCLE_UTF8  = 'ω';

/**
 * Analisa o conteúdo de @a content e retorna um vetor com os "pedaços" da
 * instrução ou false se o conteúdo recebido for inválido.
 *
 * O vetor retornado possui cinco String's na seguinte ordem:
 *   índice 0 = rótulo da operação
 *   índice 1 = primeira operação
 *   índice 2 = primeiro rótulo sucessor
 *   índice 3 = segunda operação
 *   índice 4 = segundo rótulo sucessor
 *
 * Ex.: para o conteúdo   3:(G,4),(F,5)
 *     os índices serão   0  1 2   3 4
 *
 * @param String content O conteúdo a ser analisado (espaços serão desconsiderados)
 * @return Array|Boolean O vetor com os pedaços da instrução já separados.
 *
 * @public
 * @static
 */
Instruction.parse = function(content) {
    // ignora espaços e separa os "pedaços" da instrução
    var pieces = content.replace(/ /g, '').match(validRe);

    // Validação: verifica apenas o formato geral (não os valores)
    if (!(pieces && $.isArray(pieces) && pieces.length == 6)) {
        // TODO: classe de erro específica para o projeto
        throw new Error('Instrução inválida: ' + content);
        return false;
    }

    // o índice 0 contém a instrução completa que é desnecessária, então remove
    return pieces.slice(1);
};

// -- prototype -- Propriedades e métodos acessíveis pelo objeto
Instruction.prototype = {

    /**
     * Tipo da instrução.
     * Armazena o tipo da instrução (operação, parada, ciclo, etc.).
     */
    type: null,

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
        this.instructions = Instruction.parse(rawcontent);
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
    }
};

})();   // -- end Instruction closure
