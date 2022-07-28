const IDENTIFIER_REGEX = require('./tokens').isolated.IDENTIFIER;

function is_identifier(token) {
    if (typeof token != 'string')
        return false;
    let result = RegExp('^' + IDENTIFIER_REGEX + '$').test(token);
    return result;
}

function freeza_eval(data, expr_in_tokens) {
    let token;
    for(let i = 0, l = expr_in_tokens.length; i < l; i++) {
        token = expr_in_tokens[i];
        
        if (is_identifier(token) && !(token in data)) {
            console.error(`Erro: identificador '${token}' não existe.`);
            process.exit(0);
        }
    }
    
    /* Forma uma expressão em forma de string com os tokens e retorna o resultado. */
    expr = expr_in_tokens.join('');
    js_evaluated = eval(expr);
    
    if (typeof js_evaluated == 'string')
        return "'" + js_evaluated + "'";
    return js_evaluated;
}

module.exports = freeza_eval;
