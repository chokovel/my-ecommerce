'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.hasMany(models.Product,{
        foreignKey: "authorId"
      })
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique:true, allowNull: false },
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: {type:DataTypes.STRING, unique:true, allowNull:false},
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};