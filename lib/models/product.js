'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: "authorId"
            });
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
        numReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
        authorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
