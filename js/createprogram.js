function ProgramDialog(instructions, callback) {
     this.init.apply(this, arguments);
}

ProgramDialog.prototype = {
    /**
     * Armazena o código HTML utilizado para criar o diálogo.
     */
    html: '<div id="create-program" title="Criar programa monolítico" class="js">'
         +   '<div class="create-instruction">'
         +       '<div id="add-operation">'
         +           '<input type="radio" name="instruction-type" id="operation"><label for="operation">Operação</label><br/>'
         +           'faça <input type="text" id="operation-name"> vá_para <input type="text" id="operation-nextLabel"><br/>'
         +       '</div>'
         +       '<div id="add-condition">'
         +           '<input type="radio" name="instruction-type" id="condition"><label for="condition">Condição</label><br/>'
         +           'se <input type="text" id="condition-testName"> então vá_para <input type="text" id="condition-trueLabel"> senão vá_para <input type="text" id="condition-falseLabel">'
         +       '</div>'
         +       '<div id="action-buttons">'
         +           '<button id="delete-instruction">Excluir</button>'
         +           '<button id="insert-instruction">Inserir</button>'
         +           '<button id="update-instruction">Atualizar</button>'
         +       '</div>'
         +   '</div>'
         +   '<ul class="instruction-list empty" id="instruction-list">Nenhuma instrução adicionada</ul>'
         + '</div>',

    /**
     * Configurações padrão de exibição do diálogo.
     */
    config: {
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
                    callback(this.toString());
                }
                $(this).dialog('close');
            }
        }]
    },

    /**
     * Vetor que armazena todas as instruções criadas na tela na forma de objetos.
     */
    instructions: [],

    /**
     * Controla o índice do elemento selecionado, se houver.
     */
    selectedIndex: -1,

    toggleSelection: function() {
    },

    /**
     * Converte as @{link ProgramDialog#instructions} em uma string própria para
     * exibição na tela para o usuário.
     */
    toString: function() {
        // TODO: converter para string...
        return 'isso é um teste';
    },

    /**
     * Construtor.
     */
    init: function(instructions, callback) {
        var me = this;
        this.instructions = instructions;
        $(this.html).dialog(this.config);

        $('#delete-instruction').button({
            icons: {primary: 'ui-icon-circle-close'},
            click: function() {
                //
            }
        }).hide();

        $('#insert-instruction').button({
            icons: {primary: 'ui-icon-circle-plus'}
        });
        $('#insert-instruction').click(function() {
            //
            if($('#operation').is(':checked')){
                me.appendInstruction(new SimpleInstruction(SimpleInstruction.TYPE_OPERATION,$("#operation-name").val(),$("#operation-nextLabel").val()))

            }else if($('#condition').is(':checked')){
                me.appendInstruction(new SimpleInstruction(SimpleInstruction.TYPE_TEST,$("#condition-testName").val(),$("#condition-trueLabel").val(),$("#condition-falseLabel").val()))
            }
        });

        $('#update-instruction').button({
            icons: {primary: 'ui-icon-circle-check'},
            click: function() {
                //
            }
        }).hide();
    },

    /**
     * Insere a instrução @a content no final do programa.
     *
     * @param Instruction content O conteúdo da instrução a ser criada.
     */
    appendInstruction: function(content) {
        this.instructions.push(content);
        // atualizar lista
        if($('#instruction-list').hasClass('empty'))
        {
            $('#instruction-list').empty();
            $('#instruction-list').removeClass('empty');
        }
        $('<li>'+this.instructions.length+': '+content.toString()+'</li>').appendTo('#instruction-list')
        .click(function() {
            var wasSelected = $(this).hasClass('selected');
            $('.instruction-list li.selected').removeClass('selected');
            if (!wasSelected) {
                $(this).addClass('selected');
            }
        });
    },

    /**
     * Altera o conteúdo da instrução no índice @a index para o novo conteúdo em
     * @a content.
     *
     * @param Number index O índice (rótulo) da instrução a ser atualizada.
     * @param Instruction content O novo conteúdo para a instrução.
     */
    updateInstruction: function(index, content) {
        this.instructions[index] = content;
        // atualizar lista
    },

    /**
     * Remove a instrução na posição @a index do programa.
     *
     * @param Number index Índice (rótulo) da instrução a ser removida.
     */
    removeInstruction: function(index) {
        this.instructions.splice(index, 1);
        // atualizar lista
    }
}
