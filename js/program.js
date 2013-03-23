function Program() {
    this.init.apply(this, arguments);
}

Program.prototype = {
    /**
     * Cria um novo programa monolítico a partir de um conjunto de instruções
     * rotuladas compostas. No primeiro momento, são aceitas apenas instruções
     * abreviadas no formato 1:(F,2),(G,3)
     *
     * @param String content O conteúdo do programa, definido em instruções
     *        rotuladas compostas no formato abreviado
     */
    init: function(content) {
        this.rawcontent = content || '';
    },

    /**
     * Verifica se o programa como está definido atualmente é válido
     * estuturalmente.
     *
     * @return Boolean Se o programa é válido ou não.
     */
    isValid: function() {
        if (this.rawcontent) {
            // TODO: validação
            return true;
        }

        return false;
    }
}
