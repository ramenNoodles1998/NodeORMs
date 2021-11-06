const Person = require('./Person');

class Nonemployee extends Person {
    constructor (id, first, middle, last, dob, phone, email, street, city, state, zip, company) {
        super(id, first, middle, last, dob, phone, email, street, city, state, zip);
        this.company = company;
    }
}

module.exports = Nonemployee