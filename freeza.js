const basename = require('path').basename;
const readFileSync = require('fs').readFileSync;
const tokenizer = require('./tokenizer');
const interpreter = require('./interpreter');

var program_name = basename(process.argv[2]);

var program = readFileSync(program_name, { encoding: 'utf8', flag: 'r'});



tokens = tokenizer(program);
interpreter(tokens);
