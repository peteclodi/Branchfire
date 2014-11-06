var Person = function(email, firstname, lastname) {
    if(!email) {
        throw 'Invalid person! It must contain an email address';
    }

    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;

    this.parents = [];
    this.children = [];
    this.friends = [];
};

Person.prototype.addParent = function(parent) {
    if(this.parents.length === 2) {
        throw this.getName() + ' already has 2 parents. ' + parent.getName() + ' cannot be added.';
    }
    this.parents.push(parent);
};

Person.prototype.addChild = function(child) {
    child.addParent(this);
    this.children.push(child);
};

Person.prototype.addFriend = function(friend) {
    this.friends.push(friend);
};

Person.prototype.isRelated = function(otherPerson) {
    return this._isDescendant(otherPerson) || otherPerson._isDescendant(this);
};

Person.prototype._isDescendant = function(parent) {
    if(this.parents.length === 0) {
        return false;
    }
    return (this.parents.indexOf(parent) !== -1)  ? true :
        this.parents.reduce(function(previousValue, currentValue) {
            return previousValue || currentValue._isDescendant(parent);
        }, false);
};

Person.prototype.family = function() {
    var getParentListing = function(parents) {
        return parents.map(function(parent) {
            return parent.getName();
        }).join(' ').trim();
    };

    return {
        grandparents: this.parents.map(function(parent) {
            return getParentListing(parent.parents);
        }).join(' ').trim(),
        parents: getParentListing(this.parents),
        children: this.children.map(function(child) {
            return child.getName();
        }).join(' ').trim()
    };
};

Person.prototype.getName = function() {
    return this.firstname + ' ' + this.lastname;
};

exports.Person = Person;