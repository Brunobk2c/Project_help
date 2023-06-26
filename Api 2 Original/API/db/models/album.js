'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.Artista, { foreignKey: 'artistaId' });
    }
  }
  Album.init({
    nome: DataTypes.STRING,
    artistaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artista',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Album',
    tableName: 'Album'
  });
  return Album;
};