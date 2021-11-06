const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './orm1.sqlite'
})

exports.sequelize = sequelize;