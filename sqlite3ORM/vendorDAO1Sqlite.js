const personDAO = require('./personDAO1Sqlite');


const create = async (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, vendor);

        const vendorStatement = db.prepare("INSERT INTO nonemployees VALUES (?, ?, ?, ?)");
        vendorStatement.run(
            vendor.id,
            personsId,
            vendor.companyId,
            vendor.type
        );
        console.log('vendor created');
        vendorStatement.finalize();
    });
}

const read = (db, vendorId) => {
    return new Promise((resolve, reject) => {
        const vendorStatement = 'SELECT * from nonemployees WHERE id = ?';   // Prepare the select statement
        db.get(vendorStatement, [vendorId], async (err, row) => {
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

const update = (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.update(db, vendor);

        const vendorStatement = db.prepare("UPDATE nonemployees SET personsId = ?, company = ?, type = ? WHERE id = ?");
        vendorStatement.run(
            personsId,
            vendor.companyId,
            vendor.type,
            vendor.id
        );
        vendorStatement.finalize();

        resolve(personsId);
    });
}

const del = (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        console.log(vendor.personsId);
        await personDAO.del(db, vendor.personsId);

        const vendorStatement = db.prepare("DELETE FROM nonemployees WHERE id = ?");
        vendorStatement.run(
            vendor.id
        );
        vendorStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const vendorStatement = 'SELECT * from nonemployees';
        db.all(vendorStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const vendorList = [];
                for(const row of rows){
                    const person = await personDAO.read(db, row.personsId);
                    vendorList.push({...person, ...row});
                }
                resolve(vendorList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;