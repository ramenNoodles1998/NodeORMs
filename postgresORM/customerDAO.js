const personDAO = require('./personDAO');

const create = async (db, customer) => {
    return new Promise(async (resolve, reject) => {
        const personsId = await personDAO.create(db, customer);

        const query = {
            text: 'INSERT INTO nonemployees VALUES ($1, $2, $3, $4)',
            values: [
                customer.id,
                personsId,
                customer.companyId,
                customer.type
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

const read = (db, customerId) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT * from nonemployees WHERE id = $1',
            values: [customerId]
        }

        try {
            const customer = await db.query(query);
            const person = await personDAO.read(db, customer.rows[0].personsid);
            resolve({ ...person.rows[0], ...customer.rows[0] });
        } catch (error) {
            console.error(error);
            reject();
        }
    })
}

const update = (db, customer) => {
    return new Promise(async (resolve, reject) => {
        await personDAO.update(db, customer);

        const query = {
            text: 'UPDATE nonemployees SET personsId = $1, company = $2, type = $3 WHERE id = $4',
            values: [
                customer.personsid,
                customer.companyId,
                customer.type,
                customer.id
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

const del = (db, customer) => {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'DELETE FROM nonemployees WHERE id = $1',
            values: [customer.id]
        }

        try {
            await db.query(query);
            await personDAO.del(db, customer.personsId);
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
            values: ['customer']
        }

        try {
            const customers = []
            const customer = await db.query(query);
            for(const v of customer.rows){
                const person = await personDAO.read(db, v.personsid);
                customers.push({...person.rows[0], ...v});
            }
            resolve(customers);
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