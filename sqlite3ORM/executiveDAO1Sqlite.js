const managerDAO = require('./managerDAO1Sqlite');

const create = async (db, executive) => {
    return new Promise(async (resolve, reject) => {
        const managersId = await managerDAO.create(db, executive);

        const executiveStatement = db.prepare("INSERT INTO executives VALUES (?, ?, ?)");
        executiveStatement.run(
            executive.id,
            managersId,
            executive.bonus
        );

        executiveStatement.finalize();
        resolve(executive.id);
    });
}

const read = (db, executiveId) => {
    return new Promise((resolve, reject) => {
        const executiveStatement = 'SELECT * FROM executives WHERE id = ?';   // Prepare the select statement
        db.get(executiveStatement, [executiveId], async (err, row) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                let manager = await managerDAO.read(db, row.managersId);       // Get the person infromation
                resolve({...manager, ...row});                               // Join employee info and person info and return
            }
        });
    })
}

const update = (db, executive) => {
    return new Promise(async (resolve, reject) => {
        const managersId = await managerDAO.update(db, executive);
        const executiveStatement = db.prepare("UPDATE executives SET managersId = ? WHERE id = ?");
        executiveStatement.run(
            managersId,
            executive.id
        );
        executiveStatement.finalize();

        resolve();
    });
}

const del = (db, executive) => {
    return new Promise(async (resolve, reject) => {
        await managerDAO.del(db, executive);

        const executiveStatement = db.prepare("DELETE FROM executives WHERE id = ?");
        executiveStatement.run(
            executive.id
        );
        executiveStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const executiveStatement = 'SELECT * from executives';
        db.all(executiveStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const executiveList = [];
                for(const row of rows){
                    console.log(row);
                    const manager = await managerDAO.read(db, row.managersId);
                    executiveList.push({...manager, ...row});
                }
                resolve(executiveList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;