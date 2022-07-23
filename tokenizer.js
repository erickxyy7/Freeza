function tokenizer(program) {
    var tokenRegex = /[a-zA-Z_][a-zA-Z0-9_]*|(==)|(!=)|(>=)|(<=)|[><()=;+\-\*/%\n]|[0-9]*/gm;
    
    tokens = program.match(tokenRegex);
    
    /* Remove '' */
    for (let index = tokens.indexOf(''); index != -1; index = tokens.indexOf(''))
        tokens.splice(index, 1);
    
    /* Substitui '\n' por ';' */
    for (let index = tokens.indexOf('\n'); index != -1; index = tokens.indexOf('\n'))
        tokens[index] = ';'
    
    /* Coloca ';' no final dos tokens se não houver. */
    if (tokens[tokens.length - 1] != ';')
        tokens[tokens.length] = ';'
    
    return translateSomeTokensToJavascript(tokens);
}

function translateSomeTokensToJavascript(tokens) {
    return tokens.map(function (item) {
        if (item == 'and')
            return '&&';
        else if (item == 'or')
            return '||';
        return item;
    });
}

module.exports = tokenizer;
