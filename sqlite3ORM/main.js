const sqlite3 = require('sqlite3').verbose();
const vendorDAO = require('./vendorDAO1Sqlite');
const managerDAO = require('./managerDAO1Sqlite');
const executiveDAO = require('./executiveDAO1Sqlite');

const db = new sqlite3.Database('./db/orm1', (err) => {
    if (err) {
        console.error(err.message);
    }
})

const main = async () => {
    const executive = {
        id: '111',
        first: 'WOAH',
        middle: 'TESTTEST',
        last: 'yeehaw',
        dob: '07031997',
        phone: '4351231234',
        email: 'example@example.com',
        street: '80481 Betsy',
        city: 'East Darren',
        state: 'Kansas',
        zip: '69864',
        personsId: 'c6bfb896-7c19-4ad1-b65c-b81aa5175f13',
        companyId: 'XD',
        department: 'Coordinator',
        title: 'Future Research Designer',
        salary: 479770,
        managerId: '4',
        //bonus: 123123
    //    type: 'vendor'
    }
   // await vendorDAO.create(db, vendor)
    //await vendorDAO.del(db, vendor);
    console.log(await employeeDAO.create(db, executive))
    
    
    console.log(await employeeDAO.read(db, vendor.id))

    // await employeeDAO.update(db, employee);
    // await employeeDAO.del(db, employee);
    // const returnedEmp = await employeeDAO.read(db, newEmployee.id);
    // console.log('found', returnedEmp);
    // console.log('list', returnedEmps);
    db.close();
}

main();