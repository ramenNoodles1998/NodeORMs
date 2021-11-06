const employeeDAO = require('./employeeDAO1Sqlite');

const create = async (db, manager) => {
    return new Promise(async (resolve, reject) => {
        const employeeId = await employeeDAO.create(db, manager);

        const managerStatement = db.prepare("INSERT INTO managers VALUES (?, ?)");
        managerStatement.run(
            manager.id,
            employeeId,
        );

        managerStatement.finalize();

        resolve(manager.id);
    });
}

const read = (db, managerId) => {
    return new Promise((resolve, reject) => {
        const managerStatement = 'SELECT * FROM managers WHERE id = ?';   // Prepare the select statement
        db.get(managerStatement, [managerId], async (err, row) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                let employee = await employeeDAO.read(db, row.employeesId);       // Get the person infromation
                resolve({...employee, ...row});                               // Join employee info and person info and return
            }
        });
    })
}

const update = (db, manager) => {
    return new Promise(async (resolve, reject) => {
        const employeeId = await employeeDAO.update(db, manager);
        const managerStatement = db.prepare("UPDATE managers SET employeesId = ? WHERE id = ?");
        managerStatement.run(
            employeeId,
            manager.id
        );
        managerStatement.finalize();

        resolve(manager.id);
    });
}

const del = (db, manager) => {
    return new Promise(async (resolve, reject) => {
        await employeeDAO.del(db, manager);

        const managerStatement = db.prepare("DELETE FROM managers WHERE id = ?");
        managerStatement.run(
            manager.id
        );
        managerStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const managerStatement = 'SELECT * from managers';
        db.all(managerStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const managerList = [];
                for(const row of rows){
                    const employee = await employeeDAO.read(db, row.employeesId);
                    managerList.push({...employee, ...row});
                }
                resolve(managerList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;