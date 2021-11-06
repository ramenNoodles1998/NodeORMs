const employeeDAO = require('./employeeDAO');

const create = async (db, manager) => {
    return new Promise(async (resolve, reject) => {
        const employeeId = await employeeDAO.create(db, manager);

        const query = {
            text: 'INSERT INTO managers VALUES ($1, $2)',
            values: [
                manager.id,
                employeeId
            ]
        };
        try {
            await db.query(query);
            resolve(manager.id);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const read = (db, managerId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * FROM managers WHERE id = $1',
            values: [managerId]
        }

        try {
            const manager = await db.query(query);
            const employee = await employeeDAO.read(db, manager.rows[0].employeesid);
            console.log(employee);
            resolve({ ...employee, ...manager.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, manager) => {
    return new Promise(async (resolve, reject) => {
        const employeeId = await employeeDAO.update(db, manager);

        const query = {
            text: 'UPDATE managers SET employeesId = $1 WHERE id = $2',
            values: [
                employeeId,
                manager.id
            ]
        };
        try {
            await db.query(query);
            resolve(manager.id);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const del = (db, manager) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'DELETE FROM managers WHERE id = $1',
            values: [manager.id]
        }

        try {
            await db.query(query);
            await employeeDAO.del(db, manager);
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
            text: 'SELECT * from managers',
            values: []
        }

        try {
            const managers = []
            const manager = await db.query(query);
            for (const m of manager.rows) {
                const employee = await employeeDAO.read(db, m.employeesid);
                managers.push({ ...employee, ...m });
            }
            resolve(managers);
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