const Manager = require('./Manager');

class Executive extends Manager {
    constructor (id, first, middle, last, dob, phone, email, street, city, state, zip, companyId, department, title, salary, managerId, directReports, bonus) {
        super(id, first, middle, last, dob, phone, email, street, city, state, zip, companyId, department, title, salary, managerId, directReports);
        this.bonus = bonus;
    }
}

module.exports = Executive