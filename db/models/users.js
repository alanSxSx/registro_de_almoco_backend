'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Setores, {
        foreignKey: 'id_setor', // Nome da coluna que é a chave estrangeira
        as: 'setor', // Alias para a relação (opcional)
      });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    senha: DataTypes.STRING,
    status: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
  });
  return Users;
};