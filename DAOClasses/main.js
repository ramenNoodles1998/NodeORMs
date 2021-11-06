const Customer = require('./Customer');
const Executive = require('./Executive');
const Manager = require('./Manager');
const Employee = require('./Employee');
const Contractor = require('./Contractor');
const Vendor = require('./Vendor');

const faker = require('faker');

const main = () => {
    let id = 0;
    let executives = [];
    let managers = [];
    let employees = [];
    let vendors = [];
    let contractors = [];
    let customers = [];
    const companyId = String(faker.random.uuid());

    for(let i = 0; i < 3; i++) {
        const executive = new Executive(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2000-01-01')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            companyId,
            faker.name.jobType(),
            faker.name.jobTitle(),
            faker.random.number()*1000,
            '2',
            [],
            faker.random.number()*10
        );
        id++;
        executives.push(executive);
    }
        
    for(let i = 0; i < 5; i++) {
        let execId = i < 2 ? executives[0].id : executives[1].id;
        const manager = new Manager(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2000-01-01')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            companyId,
            faker.name.jobType(),
            faker.name.jobTitle(),
            faker.random.number()*100,
            String(execId),
            []
            );
        executives[execId].directReports.push(String(id));
        managers.push(manager);
        id++;
    }

    for(let i = 0; i < 20; i++) {
        let managerId = faker.random.number() % 5;
        const employee = new Employee(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2004-12-30')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            companyId,
            faker.name.jobType(),
            faker.name.jobTitle(),
            faker.random.number()*10,
            managers[managerId].id
            );
        managers[managerId].directReports.push(String(id))
        employees.push(employee);
        id++;
    }

    for(let i = 0; i < 5; i++) {
        const vendor = new Vendor(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2000-01-01')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            String(faker.random.uuid())
            );
        vendors.push(vendor);
        id++;

        const customer = new Customer(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2000-01-01')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            String(faker.random.uuid())
            );
        customers.push(customer);
        id++;

        const contractor = new Contractor(
            String(id),
            faker.name.firstName(), 
            faker.name.firstName()[0], 
            faker.name.lastName(), 
            new Date(faker.date.between('1950-01-01', '2000-01-01')), 
            faker.phone.phoneNumber(), 
            faker.internet.email(), 
            faker.address.streetAddress(), 
            faker.address.city(), 
            faker.address.state(),
            faker.address.zipCode(), 
            String(faker.random.uuid())
            );
        contractors.push(contractor);
        id++;
    }
    console.log(executives)
    console.log(managers)
    console.log(employees)
    console.log(contractors)
    console.log(customers)
    console.log(vendors)
}

main();