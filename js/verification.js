EquivalenceVerification = {

    /**
     * Primeiro passo da verificação de equivalência.
     * Definição das instruções rotuladas compostas.
     */
    firstStep: function (simpleInstructions) {
        var compound = [],
            compoundIndexes = [],   // armazena os índices das instruções de operação
            ln = simpleInstructions.length,
            i;

        for (i = 0; i < ln; ++i) {
            if (simpleInstructions[i].type === SimpleInstruction.TYPE_OPERATION) {
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
            if (simpleInstructions[i].type === SimpleInstruction.TYPE_OPERATION) {
                trueIdx  = simpleInstructions[i].nextLabel - 1;
                falseIdx = simpleInstructions[i].nextLabel - 1;
//                continue;
//                debug[0] = simpleInstructions[i].operation;
//                debug[1] = compoundIndexes.indexOf(i) + 2;
//                debug[2] = simpleInstructions[i].operation;
//                debug[3] = compoundIndexes.indexOf(i) + 2;
            }

            while (simpleInstructions[trueIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                oldIdx = trueIdx;
                trueIdx = simpleInstructions[trueIdx].trueLabel - 1;

                if (oldIdx === trueIdx) {
                    debug[0] = 'ciclo';
                    debug[1] = 'w';
                    break;
                }
                if (trueIdx < 0 || trueIdx >= simpleInstructions.length) {
                    debug[0] = 'parada';
                    debug[1] = 'e';
                    break;
                }
                debug[0] = simpleInstructions[trueIdx].operation;
                debug[1] = compoundIndexes.indexOf(trueIdx) + 2;
            }

            while (simpleInstructions[falseIdx].type !== SimpleInstruction.TYPE_OPERATION) {
                oldIdx = falseIdx;
                falseIdx = simpleInstructions[falseIdx].falseLabel - 1;

                if (oldIdx === falseIdx) {
                    debug[2] = 'ciclo';
                    debug[3] = 'w';
                    break;
                }
                if (falseIdx < 0 || falseIdx >= simpleInstructions.length) {
                    debug[2] = 'parada';
                    debug[3] = 'e';
                    break;
                }
                debug[2] = simpleInstructions[falseIdx].operation;
                debug[3] = compoundIndexes.indexOf(falseIdx) + 2;
            }

            compound.push(compound.size+': ('+debug[0]+','+debug[1]+'),('+debug[2]+','+debug[3]+')');
            console.log(compound[compound.size-1]);
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
