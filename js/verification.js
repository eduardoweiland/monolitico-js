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
        var appendSet = function(sets, indexes) {
            var ln = sets.length,
                content = sets[ln - 1].match(/{(.*)}/)[1];
            sets.push('A' + ln + ' = {' + content + ', ' + indexes.join(', ') + '}');
        };

        var sets = ['A0 = {' + CompoundInstruction.LABEL_STOP_UTF8 + '}'],
            i;

        // procura a última parada
        for (i = compoundInstructions.length - 2; i >= 0; --i) {
            if (compoundInstructions[i].indexOf(CompoundInstruction.LABEL_STOP_UTF8) > -1) {
                appendSet(sets, [i + 1]);
                break;
            }
        }

        // verifica todas as instruções do programa acima da parada
        var ignore = [];
        while (--i) {
            if ($.inArray(i, ignore) === -1) {
                var idx = [i + 1], j;
                // procura instruções repetidas
                for (j = i - 1; j >= 0; --j) {
                    if (compoundInstructions[j].split(':')[1] === compoundInstructions[i].split(':')[1]) {
                        idx.push(j + 1);
                        ignore.push(j);
                    }
                }
                appendSet(sets, idx);
            }
        }

        sets.push('A' + sets.length + ' =' + sets[sets.length - 1].split('=')[1]);

        return sets;
    },

    /**
     * Terceiro passo da verificação de equivalência.
     * Simplificação dos ciclos infinitos (caso necessário).
     */
    thirdStep: function(compoundInstructions, labelsIn) {
        var simplified = [],
            labels = labelsIn.split('{')[1].slice(0, -1).split(', '),
            ln = compoundInstructions.length,
            toRemove = [],
            i;

        console.log(compoundInstructions);
        console.log(labelsIn);

        for (i = 1; i < ln - 1; ++i) {
            if ($.inArray(String(i), labels) > -1) {
                simplified.push(compoundInstructions[i - 1]);
            }
        }

        return simplified;
    },

    /**
     * Quarto passo da verificação de equivalência.
     * Comparação dos rótulos.
     */
    fourthStep: function(simplified1, simplified2) {
    }
};
