var fs = require('fs');
var readline = require('readline');

Parser = function() {};

Parser.prototype.parse = function (filename, community) {
    var rd = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });
    rd.on('line', function(line) {
        var personData = line.split(' ');
        switch(personData[0]) {
            case 'P':
                // create person
                community.push({email: personData[1], firstName: personData[2], lastName: personData[3]});
                break;
            case 'p':
                // set person 1 as the parent of person 2
                break;
            case 'c':
                // set person 1 as the child of person 2
                break;
            case 'f':
                // set person 1 and person 2 as friends
                break;
            default:
                throw 'Unknown code: ' + personData[0];
        }
    });
};

exports.Parser = Parser;