const { Client } = require('pg');
const personDAO = require('./personDAO');
const vendorDao = require('./vendorDAO');
const customerDao = require('./customerDAO');
const contractorDao = require('./contractorDAO');
const employeeDao = require('./employeeDAO');
const managerDao = require('./managerDAO');
const executiveDao = require('./executiveDAO');


const main = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
  });

  await client.connect();

  const executive = {
    id: '10',
    first: 'TESTTO',
    middle: 'R',
    last: 'yeehaw',
    dob: '07031997',
    phone: '435123',
    email: 'example@.com',
    street: '80481 Betsy',
    city: 'East Darren',
    state: 'Kansas',
    zip: '69864',
    personsId: 'c3e03cbc-9cb3-45dd-a820-1fda6c6311cf',
    companyId: 'XD',
    type: 'contractor',
    department: 'Coordinator',
    title: 'Future Research',
    salary: 479770,
    managerId: 5,
    bonus: 123123
  }
  // console.log(await personDAO.update(client, executive));
  // console.log(await personDAO.read(client, executive.id));
  // console.log(await personDAO.list(client));
  // await executiveDao.create(client, executive);
  console.log(await executiveDao.list(client));
  // console.log(await employeeDao.list(client, executive));
  await client.end();
}

main();