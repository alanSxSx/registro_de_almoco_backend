'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setores extends Model {
 
    static associate(models) {
      Setores.hasMany(models.Users, {
        foreignKey: 'id_setor', // Nome da coluna que é a chave estrangeira em "users"
        as: 'users', // Alias para a relação (opcional)
      });
    }
  }
  Setores.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Setores',
    tableName: 'setores',
  });
  return Setores;
};