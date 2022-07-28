const freeza_eval = require('./eval');

/* Exemplo de `data`:
    data = {
        identifier_name: {
            value: value
        }
    };
 * 
 * `data` vem com algumas palavras-chave predefinidas.
 */
var data = {
    'true': true,
    'false': false
};

function interpreter(tokens) {
    let expr, ifPosition, positionOfWhile, toPrint;
    for (let i = 0, l = tokens.length; i < l; i++) {
        
        /* Atribuição. */
        if (tokens[i].token == '=') {
            identifier_name = tokens[i - 1].token;
            
            expr = [];
            for (i++; tokens[i].token != ';' && tokens[i].tokens != 'end'; i++) {
                if (data[tokens[i].token])
                    expr[expr.length] = data[tokens[i].token].value;
                else
                    expr[expr.length] = tokens[i].token;
            }
            
            data[identifier_name] = {
                value: freeza_eval(data, expr)
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
            if (freeza_eval(data, expr))
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
            if (freeza_eval(data, expr))
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
            expr = [];
            for(i++; tokens[i].token != ';'; i++) {
                if (data[tokens[i].token])
                    expr[expr.length] = data[tokens[i].token].value;
                else
                    expr[expr.length] = tokens[i].token;
            }
            console.log(expr); process.exit(0);
            toPrint = freeza_eval(data, expr);
            if (typeof toPrint == 'string')
                console.log(eval(toPrint));
            else
                console.log(toPrint);
        }
    }
}

module.exports = interpreter;
