const { Person, Employee, Executive, Manager, Nonemployee } = require('./models')
const { sequelize } = require('./db')

const executiveData = {
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
    companyId: '12345',
    department: 'CS',
    title: 'Programmer',
    salary: 50000,
    bonus: 3000
}

const vendorData = {
    first: 'Tod',
    middle: 'R',
    last: 'Olsen',
    dob: '1987-10-03',
    phone: '435123',
    email: 'Test@.com',
    street: '123 Street',
    city: 'Orem',
    state: 'Utah',
    zip: '84058',
    company: 'Apple Inc.',
    type: 'vendor'
}

const main = async () => {
    try {
        await sequelize.sync({ force: true })

        let person = await Person.create(executiveData);
        const employee = await Employee.create({ ...executiveData, personId: person.id })
        const manager = await Manager.create({ employeeId: employee.id })
        const executive = await Executive.create({ ...executiveData, managerId: manager.id })

        //Vendor
        person = await Person.create(vendorData);
        const vendor = await Nonemployee.create({ ...vendorData, personId: person.id })

    } catch (error) {
        console.error('Unable to connect to the database:', error)
    } finally {
        await sequelize.close()
    }
}

main()