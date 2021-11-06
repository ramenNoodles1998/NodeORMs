const Nonemployee = require('./Nonemployee');

class Contractor extends Nonemployee {
    constructor (id, first, middle, last, dob, phone, email, street, city, state, zip, company) {
        super(id, first, middle, last, dob, phone, email, street, city, state, zip, company);
    }
}

module.exports = Contractor