function Instruction() {
    this.init.apply(this, arguments);
}

// -- static -- Propriedades e métodos estáticos da classe

Instruction.TYPE_OPERATION    = 1;   // instrução comum (testes e operações, sem ciclos nem paradas)
Instruction.TYPE_STOP         = 2;   // instrução que contém uma parada
Instruction.TYPE_CYCLE        = 3;   // instrução que contém um ciclo
Instruction.TYPE_FORMAL_STOP  = 4;   // instrução de parada para formalização (final do programa)
Instruction.TYPE_FORMAL_CYCLE = 5;   // instrução de ciclo para formalização (final do programa)

Instruction.LABEL_STOP_VALUE  = '&'; // valor para o rótulo de parada
Instruction.LABEL_CYCLE_VALUE = 'w'; // valor para o rótulo de ciclo

Instruction.LABEL_STOP_UTF8   = 'ε'; // representação do rótulo de parada (apenas para exibição)
Instruction.LABEL_CYCLE_UTF8  = 'ω'; // representação do rótulo de ciclo (apenas para exibição)

/**
 * Expressão regular utilizada para validar a string que representa a instrução.
 */
Instruction.VALID_REGEX = /^([0-9w&]+):\((.+),([0-9w&]+)\),\((.+),([0-9w&]+)\)$/;

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
    var pieces = content.replace(/ /g, '').match(Instruction.VALID_REGEX);

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
     * Conteúdo original recebido no construtor.
     */
    rawcontent: '',

    /**
     * Tipo da instrução.
     * Armazena o tipo da instrução (operação, parada, ciclo, etc.).
     */
    type: null,

    /**
     * Rótulo da instrução.
     * Armazena o rótulo da instrução, no formato recebido (String).
     */
    label: null,

    firstOperation: null,

    firstSucessor: null,

    secondOperation: null,

    secondSucessor: null,

    /**
     * Cria uma nova instrução de um programa monolítico a partir de uma string
     * contendo a definição da instruçção no seguinte formato:
     *            1:(F,2),(G,3)
     *
     * @param String content A definição da instrução
     * @see Instruction.VALID_REGEX
     */
    init: function(content) {
        this.rawcontent = content || '';

        try {
            var pieces = Instruction.parse(this.rawcontent);
            this.label = pieces[0];
            this.firstOperation  = pieces[1];
            this.firstSucessor   = pieces[2];
            this.secondOperation = pieces[3];
            this.secondSucessor  = pieces[4];

            this.type = Instruction.TYPE_OPERATION;
        }
        catch (e) {
            console.error(e.message);
        }
    },

    /**
     * Verifica se a instrução como está definida atualmente é válida
     * estuturalmente.
     *
     * @return Boolean Se a instrução é válida ou não.
     *
     * @public
     */
    isValid: function() {
        // sem conteúdo ou conteúdo inválido
        if (typeof(this.rawcontent) !== 'string') {
            return false;
        }

        // verifica se o tipo é válido
        switch (this.type) {
            case Instruction.TYPE_OPERATION:
            case Instruction.TYPE_STOP:
            case Instruction.TYPE_CYCLE:
            case Instruction.TYPE_FORMAL_STOP:
            case Instruction.TYPE_FORMAL_CYCLE:
                break;  // OK
            default:
                return false;   // tipo inválido
        }

        // O rótulo deve ser a parada OU o ciclo OU um número decimal válido
        if (this.label !== Instruction.LABEL_STOP_VALUE
            && this.label !== Instruction.LABEL_CYCLE_VALUE
            && isNaN(parseInt(this.label, 10))) {
            return false;
        }

        return true;
    }
};
