const init = (knex) => {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.schema.dropTableIfExists('executives');
            await knex.schema.dropTableIfExists('managers');
            await knex.schema.dropTableIfExists('employees');
            await knex.schema.dropTableIfExists('nonemployees');
            await knex.schema.dropTableIfExists('persons');

            await knex.schema.createTable('persons', table => {
                table.increments('id');
                table.string('first');
                table.string('middle');
                table.string('last');
                table.date('dob');
                table.string('phone');
                table.string('email');
                table.string('street');
                table.string('city');
                table.string('state');
                table.string('zip');
            });
            await knex.schema.createTable('employees', table => {
                table.increments('id');
                table.string('companyId');
                table.string('department');
                table.string('title');
                table.integer('salary');
                table.integer('personId').unsigned();
                table.foreign('personId').references('persons.id');
            });
            await knex.schema.createTable('managers', table => {
                table.increments('id');
                table.integer('employeeId').unsigned();
                table.foreign('employeeId').references('employees.id');
            });
            await knex.schema.createTable('executives', table => {
                table.increments('id');
                table.integer('bonus');
                table.integer('managerId').unsigned();
                table.foreign('managerId').references('managers.id');
            });
            await knex.schema.createTable('nonemployees', table => {
                table.increments('id');
                table.string('company');
                table.string('type');
                table.integer('personId').unsigned();
                table.foreign('personId').references('persons.id');
            });
            resolve();
        } catch (error) {
            console.error(error);
        }
    });
}

module.exports = { init };