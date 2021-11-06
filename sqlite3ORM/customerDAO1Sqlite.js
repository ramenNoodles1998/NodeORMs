const personDAO = require('./personDAO1Sqlite');


const create = async (db, customer) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, customer);

        const customerStatement = db.prepare("INSERT INTO nonemployees VALUES (?, ?, ?, ?)");
        customerStatement.run(
            customer.id,
            personsId,
            customer.companyId,
            customer.type
        );
        console.log('customer created')
        customerStatement.finalize();
    });
}

const read = (db, customerId) => {
    return new Promise((resolve, reject) => {
        const customerStatement = 'SELECT * from nonemployees WHERE id = ?';   // Prepare the select statement
        db.get(customerStatement, [customerId], async (err, row) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                let person = await personDAO.read(db, row.personsId);    // Get the person infromation
                resolve({...person, ...row});                               // Join employee info and person info and return
            }
        });
    })
}

const update = (db, customer) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.update(db, customer);

        const customerStatement = db.prepare("UPDATE nonemployees SET personsId = ?, company = ?, type = ? WHERE id = ?");
        customerStatement.run(
            personsId,
            customer.companyId,
            customer.type,
            customer.id
        );
        vendorStatement.finalize();

        resolve(personsId);
    });
}

const del = (db, customer) => {
    return new Promise(async (resolve, reject) => {
        console.log(customer.personsId);
        await personDAO.del(db, customer.personsId);

        const customerStatement = db.prepare("DELETE FROM nonemployees WHERE id = ?");
        customerStatement.run(
            vendor.id
        );
        customerStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const customerStatement = 'SELECT * from nonemployees';
        db.all(customerStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const customerList = [];
                for(const row of rows){
                    const person = await personDAO.read(db, row.personsId);
                    customerList.push({...person, ...row});
                }
                resolve(customerList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;