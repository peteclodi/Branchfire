var Parser = require('./parser.js').Parser;

var parser = new Parser();

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

parser.parse(process.argv[2]);