const {DataTypes} = require('sequelize');
const {sequelize} = require('../util/database');
const {Pets} = require('./pets');

module.exports = {
    User : sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        favoritePets: {
            type: DataTypes.ARRAY(DataTypes.INTEGER), // Modify the data type to an array of integers
            defaultValue: [] // Default value is an empty array
        }
    })
};