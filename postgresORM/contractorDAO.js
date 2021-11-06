const personDAO = require('./personDAO');

const create = async (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, contractor);

        const query = {
            text: 'INSERT INTO nonemployees VALUES ($1, $2, $3, $4)',
            values: [
                contractor.id,
                personsId,
                contractor.companyId,
                contractor.type
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

const read = (db, contractorId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * from nonemployees WHERE id = $1',
            values: [contractorId]
        }

        try {
            const contractor = await db.query(query);
            const person = await personDAO.read(db, contractor.rows[0].personsid);
            resolve({ ...person.rows[0], ...contractor.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.update(db, contractor);

        const query = {
            text: 'UPDATE nonemployees SET personsId = $1, company = $2, type = $3 WHERE id = $4',
            values: [
                contractor.personsid,
                contractor.companyId,
                contractor.type,
                contractor.id
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

const del = (db, contractor) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'DELETE FROM nonemployees WHERE id = $1',
            values: [contractor.id]
        }

        try {
            await db.query(query);
            await personDAO.del(db, contractor.personsId);
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
            values: ['contractor']
        }

        try {
            const contractors = []
            const contractor = await db.query(query);
            for(const v of contractor.rows){
                const person = await personDAO.read(db, v.personsid);
                contractors.push({...person.rows[0], ...v});
            }
            resolve(contractors);
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