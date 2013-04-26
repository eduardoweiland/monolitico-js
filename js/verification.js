EquivalenceVerification = {

    /**
     * Primeiro passo da verificação de equivalência.
     * Definição das instruções rotuladas compostas.
     */
    firstStep: function (simpleInstructions) {
        var compound = [],
            compoundIndexes = [],   // armazena os índices das instruções de operação
            instr = [SimpleInstruction.START].concat(simpleInstructions),
            ln = instr.length,
            hasCicle = false,
            i;

        for (i = 0; i < ln; ++i) {
            if (instr[i].type === SimpleInstruction.TYPE_OPERATION) {
                compoundIndexes.push(i);
            }
        }

        for (i = 0; i < ln; ++i) {
            var trueIdx  = i,
                falseIdx = i,
                first;

            if (compoundIndexes.indexOf(i) === -1) {
                continue;
            }

            var debug = [0,0,0,0];
            if (instr[i].type === SimpleInstruction.TYPE_OPERATION) {
                trueIdx  = instr[i].nextLabel;
                falseIdx = instr[i].nextLabel;

                debug[0] = instr[trueIdx].operation;
                debug[1] = compoundIndexes.indexOf(trueIdx) + 1;
                debug[2] = instr[falseIdx].operation;
                debug[3] = compoundIndexes.indexOf(falseIdx) + 1;

                if (trueIdx < 1 || trueIdx >= instr.length) {
                    debug[0] = 'parada';
                    debug[1] = CompoundInstruction.LABEL_STOP_UTF8;
                }
                if (falseIdx < 1 || falseIdx >= instr.length) {
                    debug[2] = 'parada';
                    debug[3] = CompoundInstruction.LABEL_STOP_UTF8;
                }
            }

            first = trueIdx;
            while (instr[trueIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                trueIdx = instr[trueIdx].trueLabel;

                if (first === trueIdx) {
                    debug[0] = 'ciclo';
                    debug[1] = CompoundInstruction.LABEL_CYCLE_UTF8;
                    hasCicle = true;
                    break;
                }
                if (trueIdx < 1 || trueIdx >= instr.length) {
                    debug[0] = 'parada';
                    debug[1] = CompoundInstruction.LABEL_STOP_UTF8;
                    break;
                }
                debug[0] = instr[trueIdx].operation;
                debug[1] = compoundIndexes.indexOf(trueIdx) + 1;
            }

            first = falseIdx;
            while (instr[falseIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                falseIdx = instr[falseIdx].falseLabel;

                if (first === falseIdx) {
                    debug[2] = 'ciclo';
                    debug[3] = CompoundInstruction.LABEL_CYCLE_UTF8;
                    hasCicle = true;
                    break;
                }
                if (falseIdx < 1 || falseIdx >= instr.length) {
                    debug[2] = 'parada';
                    debug[3] = CompoundInstruction.LABEL_STOP_UTF8;
                    break;
                }
                debug[2] = instr[falseIdx].operation;
                debug[3] = compoundIndexes.indexOf(falseIdx) + 1;
            }

            compound.push((compound.length+1)+': ('+debug[0]+','+debug[1]+'),('+debug[2]+','+debug[3]+')');
            console.log(compound[compound.length-1]);
        }

        if (hasCicle) {
            compound.push(CompoundInstruction.LABEL_CYCLE_UTF8 + ': (ciclo,' + CompoundInstruction.LABEL_CYCLE_UTF8 + '),(ciclo,' + CompoundInstruction.LABEL_CYCLE_UTF8 + ')');
        }
        else {
            compound.push(CompoundInstruction.LABEL_STOP_UTF8 + ': (parada,' + CompoundInstruction.LABEL_STOP_UTF8 + '),(parada,' + CompoundInstruction.LABEL_STOP_UTF8 + ')');
        }

        console.log(compound[compound.length-1]);

        return compound;
    },

    /**
     * Segundo passo da verificação de equivalência.
     * Definição da cadeia de conjuntos.
     */
    secondStep: function(compoundInstructions) {
        var sets = [];
        return sets;
    },

    /**
     * Terceiro passo da verificação de equivalência.
     * Simplificação dos ciclos infinitos (caso necessário).
     */
    thirdStep: function(sets) {
    },

    /**
     * Quarto passo da verificação de equivalência.
     * Comparação dos rótulos.
     */
    fourthStep: function(TODO) {
    }
};
