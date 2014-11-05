var readline = require('readline');
var Parser = require('./parser.js').Parser;
var Community = require('./community.js').Community;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var parser = new Parser();
var community = new Community();

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

var parsingCompleteCallback = function() {
    promptUser();

    rl.on('line', function(line) {
        switch(line) {
            case 'R':
            case 'r':
                rl.question('Pick the first person\n' + community.getPersonSelectionList(), function(answer) {
                    var firstPersonIndex = parseInt(answer);
                    if(!isNaN(firstPersonIndex) && (firstPersonIndex < 0 || firstPersonIndex >= community.population())) {
                        console.log('Invalid selection');
                    }
                    else {
                        rl.question('Pick the second person\n' + community.getPersonSelectionList(), function(answer) {
                            var secondPersonIndex = parseInt(answer);
                            if(!isNaN(secondPersonIndex) && (secondPersonIndex < 0 || secondPersonIndex >= (community.population() - 1))) {
                                console.log('Invalid selection');
                            }
                            else {
                                try {
                                    var person1 = community.getPersonAt(firstPersonIndex);
                                    var person2 = community.getPersonAt(secondPersonIndex);
                                    var relationship = ' are ' + (person1 === person2 ? 'the same person' :
                                            (person1.isRelated(person2) ? '' : 'not ') + 'related');
                                    console.log(person1.getName() + ' and ' + person2.getName() + relationship)
                                }
                                catch (exc) {
                                    console.log('Exception while looking up related people' + exc);
                                }
                            }
                        });
                    }
                });
                break;
            case 'F':
            case 'f':
                rl.question('Pick a person\n' + community.getPersonSelectionList(), function(answer) {
                    var personIndex = parseInt(answer);
                    if(isNaN(personIndex) || (personIndex < 0 || personIndex >= community.population())) {
                        console.log('Invalid selection');
                    }
                    else {
                        try {
                            var person = community.getPersonAt(personIndex);
                            var family = person.family();
                            console.log(person.getName() + "'s family");
                            console.log(family.grandparents.length > 0 ? 'Grandparents:\n' + family.grandparents : 'They have no grandparents');
                            console.log(family.parents.length > 0 ? 'Parents:\n' + family.parents : 'They have no parents');
                            console.log(family.children.length > 0 ? 'Children:\n' + family.children : 'They have no children');
                        }
                        catch (exc) {
                            console.log('Exception while looking up related people' + exc);
                        }
                    }
                });
                break;
            case 'Q':
            case 'q':
                closeApp();
                break;
            default:
                console.log('Unknown selection. Try Again!');
                break;
        }
    }).on('resume', function() {
        promptUser();
    }).on('close', function() {
        closeApp();
    });
};

var parsingErrorCallback = function (error) {
    console.log(error);
};

parser.parse(process.argv[2], community, parsingCompleteCallback, parsingErrorCallback);

var promptUser = function() {
    console.log('Which query would you like to perform:');
    console.log('Is [R]elated, Show [F]amily or [Q]uit?');
    rl.prompt();
};

var closeApp = function() {
    console.log('Good-Bye!');
    process.exit(0);
};
