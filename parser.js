var fs = require('fs');
var readline = require('readline');
var Person = require('./person.js').Person;

Parser = function() {};

Parser.prototype.parse = function (filename, community, parsingCompleteCallback, errorCallback) {
    var rd = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    });
    var self = this;
    rd.on('line', function(line) {
        var personData = line.split(' ');
        switch(personData[0]) {
            case 'P':
                try {
                    // create person
                    community.addPerson(new Person(personData[1], personData[2], personData[3]));
                }
                catch(exc) {
                    if(errorCallback !== null) {
                        errorCallback(exc);
                    }
                }
                break;
            case 'p':
                // set person 1 as the parent of person 2
                self._setParentChildRelationship(personData[1], personData[2], community);
                break;
            case 'c':
                // set person 1 as the child of person 2
                self._setParentChildRelationship(personData[2], personData[1], community);
                break;
            case 'f':
                // set person 1 and person 2 as friends
                var person1 = community.findPerson(personData[1]);
                var person2 = community.findPerson(personData[2]);
                if(person1.length !== 1) {
                    if(errorCallback !== null) {
                        errorCallback('Person 1(' + personData[1] + ') does not exist and cannot have a friend(' + personData[2] + ')');
                    }
                }
                if(person2.length !== 1) {
                    if(errorCallback !== null) {
                        errorCallback('Person 2(' + personData[2] + ') does not exist and cannot have a friend(' + personData[1] + ')');
                    }
                }
                person1[0].addFriend(person2[0]);
                person2[0].addFriend(person1[0]);
                break;
            default:
                throw 'Unknown code: ' + personData[0];
        }
    });

    rd.on('close', function() {
        if(parsingCompleteCallback !== null) {
            parsingCompleteCallback();
        }
    });
};

Parser.prototype._setParentChildRelationship = function(parentEmail, childEmail, community, errorCallback) {
    var parents = community.findPerson(parentEmail);
    var children = community.findPerson(childEmail);
    if(parents.length !== 1) {
        if(errorCallback !== null) {
            errorCallback('Parent(' + parentEmail + ') does not exist for child(' + childEmail + ')');
        }
    }
    if(children.length !== 1) {
        if(errorCallback !== null) {
            errorCallback('Child(' + childEmail + ') does not exist for parent(' + parentEmail + ')');
        }
    }
    parents[0].addChild(children[0]);
};

exports.Parser = Parser;