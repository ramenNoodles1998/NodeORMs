const personDAO = require('./personDAO');

const create = async (db, employee) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, employee);

        const query = {
            text: 'INSERT INTO employees VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [
                employee.id,
                personsId,
                employee.companyId,
                employee.department,
                employee.title,
                employee.salary,
                employee.managerId,
            ]
        };

        try {
            await db.query(query);
            resolve(employee.id);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const read = (db, employeeId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * from employees WHERE id = $1',
            values: [employeeId]
        }

        try {
            const employee = await db.query(query);
            const person = await personDAO.read(db, employee.rows[0].personsid);
            resolve({ ...person.rows[0], ...employee.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, employee) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.update(db, employee);

        const query = {
            text: 'UPDATE employees SET companyId = $1, department = $2, title = $3, salary = $4, managerId = $5 WHERE id = $6',
            values: [
                employee.companyId,
                employee.department,
                employee.title,
                employee.salary,
                employee.managerId,
                employee.id,
            ]
        };

        try {
            await db.query(query);
            resolve(employee.id);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const del = (db, employee) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'DELETE FROM employees WHERE id = $1',
            values: [employee.id]
        }

        try {
            await db.query(query);
            await personDAO.del(db, employee.personsId);
            resolve();
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const list = (db) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * from employees',
            values: []
        }

        try {
            const employees = []
            const employee = await db.query(query);
            for (const e of employee.rows) {
                const person = await personDAO.read(db, e.personsid);
                employees.push({ ...person.rows[0], ...e });
            }
            resolve(employees);
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;