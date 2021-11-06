const { v4 } = require('uuid');

const create = (db, person) => {
    return new Promise((resolve, reject) => {
        const personsId = v4();
        const query = {
            text: 'INSERT INTO persons VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [
                personsId,
                person.first,
                person.middle,
                person.last,
                person.dob,
                person.phone,
                person.email,
                person.street,
                person.city,
                person.state,
                person.zip,
            ]
        };

        try {
            db.query(query);
            resolve(personsId);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const read = (db, personsId) => {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * FROM persons WHERE id = $1',
            values: [personsId]
        };

        try {
            const result = db.query(query);
            resolve(result);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const update = (db, person) => {
    return new Promise((resolve, reject) => {
        const query = {
            text: "UPDATE persons SET first = $1, middle = $2, last = $3, dob = $4, phone = $5, email = $6, street = $7, city = $8, state = $9, zip = $10 WHERE id = $11",
            values: [
                person.first,
                person.middle,
                person.last,
                person.dob,
                person.phone,
                person.email,
                person.street,
                person.city,
                person.state,
                person.zip,
                person.personsId
            ]
        };

        try {
            const result = db.query(query);
            resolve(result);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const del = (db, personsId) => {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'DELETE FROM persons WHERE id = $1',
            values: [personsId]
        }
        try {
            const result = db.query(query);
            resolve(result);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * from persons',
            values: []
        }

        try {
            const result = db.query(query);
            resolve(result);
        } catch (error) {
            console.error(error);
            reject();
        }
    });
}

exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;