const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Pets : sequelize.define('pets', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        imgURL: DataTypes.STRING,
        type: DataTypes.STRING,
        breed: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.STRING,
        size: DataTypes.STRING,
        color: DataTypes.STRING,
        houseTrained: DataTypes.BOOLEAN,
        goodWithDogs: DataTypes.BOOLEAN,
        goodWithCats: DataTypes.BOOLEAN,
        goodWithKids: DataTypes.BOOLEAN,
        specialNeeds: DataTypes.BOOLEAN,
        bio: DataTypes.STRING
    })
}