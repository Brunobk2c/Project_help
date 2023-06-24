'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Musicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Musicas.belongsTo(models.Artista, { foreignKey: 'artistaId' });
      Musicas.belongsTo(models.Album, { foreignKey: 'albumId' });

    }
  }
  Musicas.init({
    nome: DataTypes.STRING,
    genero: DataTypes.STRING,
    dataLancamento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Musicas',
  });
  return Musicas;
};