'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RickYMorty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RickYMorty.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    created: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RickYMorty',
  });
  return RickYMorty;
};