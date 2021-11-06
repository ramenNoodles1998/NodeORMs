const { v4 } = require('uuid');

const create = (db, person) => {
    return new Promise((resolve, reject) => {
        const personsId = v4();
        const personStatement = db.prepare("INSERT INTO persons VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        personStatement.run(
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
            person.zip
        );
        personStatement.finalize();

        resolve(personsId);
    });
}

const read = (db, personsId) => {
    return new Promise((resolve, reject) => {
        const personStatement = 'SELECT * FROM persons WHERE id = ?';
        db.get(personStatement, [personsId], (err, row) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

const update = (db, person) => {
    return new Promise((resolve, reject) => {
        const personStatement = db.prepare("UPDATE persons SET first = ?, middle = ?, last = ?, dob = ?, phone = ?, email = ?, street = ?, city = ?, state = ?, zip = ? WHERE id = ?");
        personStatement.run(
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
        );
        personStatement.finalize();

        resolve(person.personsId);
    });
}

const del = (db, personsId) => {
    return new Promise((resolve, reject) => {
        const personStatement = db.prepare("DELETE FROM persons WHERE id = ?");
        personStatement.run(
            personsId
        );
        personStatement.finalize();

        resolve(personsId);
    });
}

const list = (db) => {
    return new Promise((resolve, reject) => {
        const personStatement = 'SELECT * from persons';
        db.all(personStatement, [], (err, rows) => {
            if (err) {
                console.error('ERROR: ', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;
exports.list = list;