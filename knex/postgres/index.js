const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'postgres'
    }
});

const personData = {
    first: 'TESTTO',
    middle: 'R',
    last: 'yeehaw',
    dob: '1997-07-03',
    phone: '435123',
    email: 'example@.com',
    street: '80481 Betsy',
    city: 'East Darren',
    state: 'Kansas',
    zip: '69864',
}
const employeeData = {
    companyId: '12345',
    department: 'CS',
    title: 'Programmer',
    salary: 50000,
}
const managerData = {}
const executiveData = {
    bonus: 3000
}

const vendorPerson = {
    first: 'Tod',
    middle: 'R',
    last: 'Olsen',
    dob: '1987-10-03',
    phone: '435123',
    email: 'Test@.com',
    street: '123 Street',
    city: 'Orem',
    state: 'Utah',
    zip: '84058'
}

const vendorData = {
    company: 'Apple Inc.',
    type: 'vendor'
}

const { init } = require('./init');

const main = async () => {
    try {
        await init(knex);

        const personId = await knex('persons')
            .insert(personData)
            .returning('id')
            .into('persons');

        const employeeId = await knex('employees')
            .insert({ ...employeeData, personId: personId[0] })
            .returning('id')
            .into('employees');

        const managerId = await knex('managers')
            .insert({ ...managerData, employeeId: employeeId[0] })
            .returning('id')
            .into('managers');
            
        const executiveId = await knex('executives')
            .insert({ ...executiveData, managerId: managerId[0] })
            .returning('id')
            .into('executives');

            
        const person1Id = await knex('persons')
            .insert(vendorPerson)
            .returning('id')
            .into('persons');
            
        const vendor = await knex('nonemployees')
            .insert({ ...vendorData, personId: person1Id[0] })
            .returning('id')
            .into('nonemployees');


    } catch (error) {
        console.error(error);
    } finally {
        await knex.destroy();
    }
}

main();