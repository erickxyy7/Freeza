const tokensReg = require('./tokens');

function tokenizer(program) {
    tokens = program.match(tokensReg.tokenRegex);
    
    /* Remove '' */
    for (let index = tokens.indexOf(''); index != -1; index = tokens.indexOf(''))
        tokens.splice(index, 1);
    
    /* Substitui '\n' por ';' */
    for (let index = tokens.indexOf('\n'); index != -1; index = tokens.indexOf('\n'))
        tokens[index] = ';'
    
    /* Coloca ';' no final dos tokens se não houver. */
    if (tokens[tokens.length - 1] != ';')
        tokens[tokens.length] = ';'
    
    /* Remove ';' desnecessários. */
    for (let i = 0, l = tokens.length; i < l; i++) {
        if (tokens[i] == ';' && tokens[i + 1] == ';')
            delete tokens[i];
    }
    intermediate_tokens = tokens;
    tokens = [];
    intermediate_tokens.forEach(function (item) {
        tokens[tokens.length] = item;
    });
    
    return translateSomeTokensToJavascript(tokens);
}

function translateSomeTokensToJavascript(tokens) {
    return tokens.map(function (item) {
        if (item == 'and')
            return '&&';
        else if (item == 'or')
            return '||';
        else if (item == '==')
            return '===';
        return item;
    });
}

module.exports = tokenizer;
