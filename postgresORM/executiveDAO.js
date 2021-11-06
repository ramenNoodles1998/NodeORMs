const managerDAO = require('./managerDAO');

const create = async (db, executive) => {
    return new Promise(async (resolve, reject) => {
        const managerId = await managerDAO.create(db, executive);

        const query = {
            text: 'INSERT INTO executives VALUES ($1, $2, $3)',
            values: [
                executive.id,
                managerId,
                executive.bonus
            ]
        };
        try {
            await db.query(query);
            resolve(executive.id);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const read = (db, executiveId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * FROM executives WHERE id = $1',
            values: [executiveId]
        }

        try {
            const executive = await db.query(query);
            const manager = await managerDAO.read(db, executive.rows[0].managersid);
            resolve({ ...manager, ...executive.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, executive) => {
    return new Promise(async (resolve, reject) => {
        const managerId = await managerDAO.update(db, executive);

        const query = {
            text: 'UPDATE executives SET managersId = $1 WHERE id = $2',
            values: [
                managerId,
                executive.id
            ]
        };

        try {
            const result = await db.query(query);
            resolve(result);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const del = (db, executive) => {
    return new Promise(async (resolve, reject) => {

        const query = {
            text: 'DELETE FROM executives WHERE id = $1',
            values: [executive.id]
        }

        try {
            await db.query(query);
            await managerDAO.del(db, executive);
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
            text: 'SELECT * from executives',
            values: []
        }

        try {
            const executives = []
            const executive = await db.query(query);
            for (const e of executive.rows) {
                const manager = await managerDAO.read(db, e.managersid);
                executives.push({ ...manager, ...e });
            }
            resolve(executives);
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