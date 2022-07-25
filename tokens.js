var STRING_APOSTROPHE = "'([^']+)'";
var IDENTIFIER = '[a-zA-Z_][a-zA-Z0-9_]*';
var RELATIONAL_OPERATORS = '(==)|(!=)|(>=)|(<=)|(>)|(<)';
var PARENTHESES = '[()]';
var ASSIGNMENT = '=';
var END_OF_COMMAND = '[;\n]';
var MATHEMATICAL_OPERATORS = '[%*+-/]';
var NUMBERS = '[0-9]*';

var tokenRegex = new RegExp(`${STRING_APOSTROPHE}|${IDENTIFIER}|${RELATIONAL_OPERATORS}|${PARENTHESES}|${ASSIGNMENT}|${END_OF_COMMAND}|${MATHEMATICAL_OPERATORS}|${NUMBERS}`, 'g');

module.exports = {
    tokenRegex: tokenRegex,
    isolated: {
        STRING_APOSTROPHE: "'([^']+)'"
    }
};
