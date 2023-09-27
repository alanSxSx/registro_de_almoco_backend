'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refeicoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Defina as associações aqui
      Refeicoes.belongsTo(models.Users, {
        foreignKey: 'id_funcionario',
        as: 'funcionario', // Alias para a relação com o usuário funcionário
      });
    }
  }
  Refeicoes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_funcionario: DataTypes.INTEGER,
      data: DataTypes.DATE,
      time: DataTypes.TIME,
      tipo: DataTypes.STRING,
      preco_funcionario: DataTypes.FLOAT,
      preco_empresa: DataTypes.FLOAT,
      preco_total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Refeicoes',
      tableName: 'refeicoes',
    }
  );
  return Refeicoes;
};
