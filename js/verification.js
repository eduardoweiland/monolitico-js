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
            i;

        for (i = 0; i < ln; ++i) {
            if (instr[i].type === SimpleInstruction.TYPE_OPERATION) {
                compoundIndexes.push(i);
            }
        }

        for (i = 0; i < ln; ++i) {
            var trueIdx  = i,
                falseIdx = i,
                oldIdx;

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
                    debug[1] = 'e';
                }
                if (falseIdx < 1 || falseIdx >= instr.length) {
                    debug[2] = 'parada';
                    debug[3] = 'e';
                }
            }

            while (instr[trueIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                oldIdx = trueIdx;
                trueIdx = instr[trueIdx].trueLabel;

                if (oldIdx === trueIdx) {
                    debug[0] = 'ciclo';
                    debug[1] = 'w';
                    break;
                }
                if (trueIdx < 1 || trueIdx >= instr.length) {
                    debug[0] = 'parada';
                    debug[1] = 'e';
                    break;
                }
                debug[0] = instr[trueIdx].operation;
                debug[1] = compoundIndexes.indexOf(trueIdx) + 1;
            }

            while (instr[falseIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                oldIdx = falseIdx;
                falseIdx = instr[falseIdx].falseLabel;

                if (oldIdx === falseIdx) {
                    debug[2] = 'ciclo';
                    debug[3] = 'w';
                    break;
                }
                if (falseIdx < 1 || falseIdx >= instr.length) {
                    debug[2] = 'parada';
                    debug[3] = 'e';
                    break;
                }
                debug[2] = instr[falseIdx].operation;
                debug[3] = compoundIndexes.indexOf(falseIdx) + 1;
            }

            compound.push((compound.length+1)+': ('+debug[0]+','+debug[1]+'),('+debug[2]+','+debug[3]+')');
            console.log(compound[compound.length-1]);
        }

        return compound;
    },

    /**
     * Segundo passo da verificação de equivalência.
     * Definição da cadeia de conjuntos.
     */
    secondStep: function(compoundInstructions) {
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
