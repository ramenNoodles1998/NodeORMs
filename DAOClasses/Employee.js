const Person = require('./Person');

class Employee extends Person {
    constructor (id, first, middle, last, dob, phone, email, street, city, state, zip, companyId, department, title, salary, managerId) {
        super(id, first, middle, last, dob, phone, email, street, city, state, zip);
        this.companyId = companyId;
        this.department = department;
        this.title = title;
        this.salary = salary;
        this.managerId = managerId;
    }
}

module.exports = Employee