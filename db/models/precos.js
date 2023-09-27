'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Precos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defina associações aqui, se necessário
    }
  }
  Precos.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      precofuncionario: DataTypes.FLOAT,
      precoempresa: DataTypes.FLOAT,
      precototal: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Precos',
      tableName: 'precos',
    }
  );
  return Precos;
};
