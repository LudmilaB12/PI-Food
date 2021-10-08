const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    healtyscore: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createInDB : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },  {
    timestamps: false
    
  });
};
