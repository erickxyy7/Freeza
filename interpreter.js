const STRING_APOSTROPHE = require('./tokens').isolated.STRING_APOSTROPHE;

function is_string(value) {
    value = String(value);
    let result = value.match(RegExp(STRING_APOSTROPHE, 'g'));
    if (result == null)
        return false;
    return true;
}

/* Exemplo de `data`:
    data = {
        identifier_name: {
            value: value
        }
    };
 */
var data = {};

function interpreter(tokens) {
    let expr, ifPosition, positionOfWhile;
    for (let i = 0, l = tokens.length; i < l; i++) {
        
        /* Atribuição. */
        if (tokens[i].token == '=') {
            identifier_name = tokens[i - 1].token;
            
            expr = '';
            for (i++; tokens[i].token != ';' && tokens[i].tokens != 'end'; i++) {
                if (data[tokens[i].token])
                    expr += data[tokens[i].token].value;
                else
                    expr += tokens[i].token;
            }
            
            if (is_string(expr)) {
                data[identifier_name] = {
                    value: expr
                };
            } else {
                data[identifier_name] = {
                    value: eval(expr)
                };
            }
        }
        
        /* Condicional if. */
        if (tokens[i].token == 'if') {
            ifPosition = i;
            expr = '';
            for (i++; tokens[i].token != ';' && tokens[i].token != 'then'; i++) {
                if (data[tokens[i].token])
                    expr += data[tokens[i].token].value;
                else
                    expr += tokens[i].token;
            }
            
            /* Caso a expressão seja verdadeira. */
            if (eval(expr))
                continue;
            
            /* Caso a expressão seja falsa. */
            i = tokens[ifPosition].positionOfEnd + 1;
        }
        
        /* Loop while. */
        if (tokens[i].token == 'while') {
            whilePosition = i;
            expr = '';
            for (i++; tokens[i].token != ';'; i++) {
                if (data[tokens[i].token])
                    expr += data[tokens[i].token].value;
                else
                    expr += tokens[i].token;
            }
            
            /* Caso a expressão seja verdadeira. */
            if (eval(expr))
                continue;
            
            /* Caso a expressão seja falsa. */
            i = tokens[whilePosition].positionOfEnd + 1;
        }
        
        /* 'end' de while. */
        if (tokens[i].token == 'end' && (positionOfWhile = tokens[i].positionOfWhile) != undefined)
            i = positionOfWhile - 1;
        
        /* Comando especial: print
         * Imprime na tela.
         */
        if (tokens[i].token == 'print') {
            expr = '';
            for(i++; tokens[i].token != ';'; i++) {
                if (data[tokens[i].token])
                    expr += data[tokens[i].token].value;
                else
                    expr += tokens[i].token;
            }
            console.log(eval(expr));
        }
    }
}

module.exports = interpreter;
