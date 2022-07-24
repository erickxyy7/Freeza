/* Exemplo de `data`:
    data = {
        identifier_name: {
            value: value
        }
    };
 */
var data = {};

function interpreter(tokens) {
    console.log(tokens);
    let expr, ifPosition, positionOfWhile;
    for (let i = 0, l = tokens.length; i < l; i++) {
        
        /* Atribuição. */
        if (tokens[i].token == '=') {
            identifier_name = tokens[i - 1].token;
            
            expr = [];
            for (i++; tokens[i].token != ';' && tokens[i].tokens != 'end'; i++) {
                if (data[tokens[i].token])
                    expr += data[tokens[i].token].value;
                else
                    expr += tokens[i].token;
            }
            
            data[identifier_name] = {
                value: eval(expr)
            };
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
            i = positionOfWhile;
    }
    
    console.log(data);
}

module.exports = interpreter;
