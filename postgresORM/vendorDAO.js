const personDAO = require('./personDAO');

const create = async (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, vendor);

        const query = {
            text: 'INSERT INTO nonemployees VALUES ($1, $2, $3, $4)',
            values: [
                vendor.id,
                personsId,
                vendor.companyId,
                vendor.type
            ]
        }

        try {
            await db.query(query);
            resolve(personsId);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const read = (db, vendorId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * from nonemployees WHERE id = $1',
            values: [vendorId]
        }

        try {
            const vendor = await db.query(query);
            const person = await personDAO.read(db, vendor.rows[0].personsid);
            resolve({ ...person.rows[0], ...vendor.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.update(db, vendor);

        const query = {
            text: 'UPDATE nonemployees SET personsId = $1, company = $2, type = $3 WHERE id = $4',
            values: [
                vendor.personsid,
                vendor.companyId,
                vendor.type,
                vendor.id
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

const del = (db, vendor) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'DELETE FROM nonemployees WHERE id = $1',
            values: [vendor.id]
        }

        try {
            await db.query(query);
            await personDAO.del(db, vendor.personsId);
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
            text: 'SELECT * from nonemployees WHERE type = $1',
            values: ['vendor']
        }

        try {
            const vendors = []
            const vendor = await db.query(query);
            for(const v of vendor.rows){
                const person = await personDAO.read(db, v.personsid);
                vendors.push({...person.rows[0], ...v});
            }
            resolve(vendors);
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