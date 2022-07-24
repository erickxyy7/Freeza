/* Adiciona algumas informações aos tokens. */
function lexer(tokens) {
    
    let x, keyword, endOfKeyword;
    for(let i = 0, l = tokens.length; i < l; i++) {
        if (tokens[i] == 'if') {
            /* Encontra o 'end' deste 'if'. */
            
            keyword = i;
            j = i;
            x = 1;
            while (true) {
                j++;
                
                if (tokens[j] == 'if'  || tokens[j] == 'while')
                    x++;
                else if (tokens[j] == 'end')
                    x--;
                
                if (tokens[j] == 'end' && x == 0) {
                    endOfKeyword = j;
                    break;
                }
            }
            
            tokens[keyword] = {
                token: 'if',
                positionOfEnd: endOfKeyword
            };
            
            tokens[endOfKeyword] = {
                token: 'end',
                positionOfIf: keyword
            };
        } else if (tokens[i] == 'while') {
            /* Encontra o 'end' deste 'while'. */
            
            keyword = i;
            j = i;
            x = 1;
            while (true) {
                j++;
                
                if (tokens[j] == 'while' || tokens[j] == 'if')
                    x++;
                else if (tokens[j] == 'end')
                    x--;
                
                if (tokens[j] == 'end' && x == 0) {
                    endOfKeyword = j;
                    break;
                }
            }
            
            tokens[keyword] = {
                token: 'while',
                positionOfEnd: endOfKeyword
            };
            
            tokens[endOfKeyword] = {
                token: 'end',
                positionOfWhile: keyword
            };
        }
    }
    
    for (let i = 0, l = tokens.length; i < l; i++) {
        if (typeof tokens[i] == 'string')
            tokens[i] = {
                token: tokens[i]
            };
    }
    
    return tokens;
}

module.exports = lexer;
