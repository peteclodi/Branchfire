var Community = function(email, firstname, lastname) {
    this.people = [];
};

Community.prototype.population = function() {
    return this.people.length;
};

Community.prototype.addPerson = function(person) {
    var people =  this.findPerson(person.email);
    if(people.length !== 0) {
        throw 'At least 1 person already has this email address(' + person.email + ')';
    }

    this.people.push(person);
};

Community.prototype.removePerson = function(person) {
    var personIndex = this.people.indexOf(person);
    if(personIndex !== -1) {
        this.people.splice(personIndex, 1);
    }
};

Community.prototype.getPersonAt = function(index) {
    if(index < 0 || index >= this.population()) {
        throw 'Invalid person index';
    }
    return this.people[index];
};

Community.prototype.findPerson = function(email) {
    return this.people.filter(function(person) {
        return person.email === email;
    });
};

Community.prototype.getPersonSelectionList = function() {
    return this.people.map(function(person, index) {
        return '[' + index + '] '+ person.getName();
    }).join('\n') + '\n';
};

Community.prototype.displayCommunity = function() {
    this.people.forEach(function(person) {
        person.displayPerson();
    });
};

exports.Community = Community;