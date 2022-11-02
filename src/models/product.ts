'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: "authorId"
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    countInStock: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    numReviews: {type:DataTypes.INTEGER, defaultValue: 0},
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};