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
                if (typeof this.JSobj.callback === 'function') {
                    this.JSobj.callback(this.JSobj);
                }
                $(this).dialog('close');
            }
        }]
    },

    populateFields: function(value){

        $('#operation-name').val(value.operation);
        $('#operation-nextLabel').val(value.nextLabel);
        $('#condition-testName').val(value.testName);
        $('#condition-trueLabel').val(value.trueLabel);
        $('#condition-falseLabel').val(value.falseLabel);
        
    },


    /**
     * Vetor que armazena todas as instruções criadas na tela na forma de objetos.
     */
    instructions: [],

    /**
     * Controla o índice do elemento selecionado, se houver.
     */
    selectedIndex: -1,

    toggleSelection: function(me) {
        var wasSelected = $(this).hasClass('selected');
        $('.instruction-list li.selected').removeClass('selected');
        if (!wasSelected) {
            $(this).addClass('selected');
            me.selectedIndex = $(this).index();
            me.populateFields(me.instructions[me.selectedIndex]);
        }else{
            
            me.populateFields({});
        }
    },

    callback: null,

    /**
     * Converte as @{link ProgramDialog#instructions} em uma string própria para
     * exibição na tela para o usuário.
     */
    toString: function() {
        var string = '', i;
        for (i = 0; i < this.instructions.length; ++i) {
            string += (i + 1) + ': ' + this.instructions[i].toString() + '<br/>';
        }
        return string;
    },

    /**
     * Construtor.
     */
    init: function(instructions, callback) {
        var me = this, i;
        this.callback = callback;
        this.instructions = [];

        $(this.html).dialog(this.config);
        document.getElementById('create-program').JSobj = this;

        var instructionsCopy = instructions.slice();
        for (i = 0; i < instructionsCopy.length; ++i) {
            me.appendInstruction.call(me, instructionsCopy[i]);
        }

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
            me.populateFields({});
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
    appendInstruction: function(content) 
    {
        var me = this;
        me.instructions.push(content);
        // atualizar lista
        if($('#instruction-list').hasClass('empty'))
        {
            $('#instruction-list').empty();
            $('#instruction-list').removeClass('empty');
        }
        $('<li>'+me.instructions.length+': '+content.toString()+'</li>')
            .appendTo('#instruction-list')
            .click(function(){me.toggleSelection.call(this,me)});
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
