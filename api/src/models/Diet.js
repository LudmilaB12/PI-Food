const { DataTypes } = require('sequelize');

//Modelo para el tipo de dieta

module.exports = (sequelize) => {
    sequelize.define("Diet", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}