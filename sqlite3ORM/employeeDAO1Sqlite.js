const personDAO = require('./personDAO1Sqlite');


const create = async (db, employee) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, employee);

        const employeeStatement = db.prepare("INSERT INTO employees VALUES (?, ?, ?, ?, ?, ?, ?)");
        employeeStatement.run(
            employee.id,
            personsId,
            employee.companyId,
            employee.department,
            employee.title,
            employee.salary,
            employee.managerId,
        );

        employeeStatement.finalize();

        resolve(employee.id);
    });
}

const read = (db, employeeId) => {
    return new Promise((resolve, reject) => {
        const employeeStatement = 'SELECT * from employees WHERE id = ?';   // Prepare the select statement
        db.get(employeeStatement, [employeeId], async (err, row) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                let person = await personDAO.read(db, row.personsId);       // Get the person infromation
                resolve({...person, ...row});                               // Join employee info and person info and return
            }
        });
    })
}

const update = (db, employee) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.update(db, employee);

        const employeeStatement = db.prepare("UPDATE employees SET companyId = ?, department = ?, title = ?, salary = ?, managerId = ? WHERE id = ?");
        employeeStatement.run(
            employee.companyId,
            employee.department,
            employee.title,
            employee.salary,
            employee.managerId,
            employee.id,
        );
        employeeStatement.finalize();

        resolve(employee.id);
    });
}

const del = (db, employee) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.del(db, employee.personsId);

        const employeeStatement = db.prepare("DELETE FROM employees WHERE id = ?");
        employeeStatement.run(
            employee.id
        );
        employeeStatement.finalize();
        resolve();
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const employeeStatement = 'SELECT * from employees';
        db.all(employeeStatement, [], async (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                const employeeList = [];
                for(const row of rows){
                    const person = await personDAO.read(db, row.personsId);
                    employeeList.push({...person, ...row});
                }
                resolve(employeeList);
            }
        });
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;