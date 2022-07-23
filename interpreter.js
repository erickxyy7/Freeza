/* Exemplo de `data`:
    data = {
        identifier_name: {
            value: value
        }
    };
 */
var data = {};

function interpreter(tokens) {
    let expr;
    for (let i = 0, l = tokens.length; i < l; i++) {
        
        /* Atribuição. */
        if (tokens[i] == '=') {
            identifier_name = tokens[i - 1];
            
            expr = [];
            for (i++; tokens[i] != ';' && tokens[i] != 'end'; i++) {
                if (data[tokens[i]])
                    expr += data[tokens[i]].value;
                else
                    expr += tokens[i];
            }
            
            data[identifier_name] = {
                value: eval(expr)
            };
        }
        
        /* Condicional if. */
        if (tokens[i] == 'if') {
            expr = '';
            for (i++; tokens[i] != ';' && tokens[i] != 'then'; i++) {
                if (data[tokens[i]])
                    expr += data[tokens[i]].value;
                else
                    expr += tokens[i];
            }
            
            /* Caso a expressão seja verdadeira. */
            if (eval(expr))
                continue;
            
            for (i++; tokens[i] != 'end'; i++);
        }
    }
    
    console.log(data);
}

module.exports = interpreter;
