const personDAO = require('./personDAO1Sqlite');


const create = async (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, contractor);

        const contractorStatement = db.prepare("INSERT INTO nonemployees VALUES (?, ?, ?, ?)");
        contractorStatement.run(
            contractor.id,
            personsId,
            contractor.companyId,
            contractor.type
        );

        contractorStatement.finalize();
    });
}

const read = (db, contractorId) => {
    return new Promise((resolve, reject) => {
        const contractorStatement = 'SELECT * from nonemployees WHERE id = ?';   // Prepare the select statement
        db.get(contractorStatement, [contractorId], async (err, row) => {
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

const update = (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.update(db, contractor);

        const contractorStatement = db.prepare("UPDATE nonemployees SET personsId = ?, company = ?, type = ? WHERE id = ?");
        contractorStatement.run(
            personsId,
            contractor.companyId,
            contractor.type,
            contractor.id
        );
        contractorStatement.finalize();

        resolve(personsId);
    });
}

const del = (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        console.log(contractor.personsId);
        await personDAO.del(db, contractor.personsId);

        const contractorStatement = db.prepare("DELETE FROM nonemployees WHERE id = ?");
        contractorStatement.run(
            contractor.id
        );
        contractorStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const contractorStatement = 'SELECT * from nonemployees';
        db.all(contractorStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const contractorList = [];
                for(const row of rows){
                    const person = await personDAO.read(db, row.personsId);
                    contractorList.push({...person, ...row});
                }
                resolve(contractorList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;