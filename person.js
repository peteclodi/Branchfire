var Person = function(email, firstname, lastname) {
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

Person.prototype.displayPerson = function() {
    console.log(this.getName() + '<' + this.email + '>');

    console.log('\tParents:');
    if(this.parents.length === 0) {
        console.log('\t\tNo Parents');
    }
    else {
        this.parents.forEach(function(parent) {
            console.log('\t\t' + parent.getName());
        });
    }

    console.log('\tChildren:');
    if(this.children.length === 0) {
        console.log('\t\tNo Children');
    }
    else {
        this.children.forEach(function(child) {
            console.log('\t\t' + child.getName());
        });
    }

    console.log('\tFriends:');
    if(this.friends.length === 0) {
        console.log('\t\tNo Friends');
    }
    else {
        this.friends.forEach(function(friend) {
            console.log('\t\t' + friend.getName());
        });
    }
};

exports.Person = Person;