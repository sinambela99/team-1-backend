"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "cascade",
        hooks: true,
      });
      Product.hasMany(models.Payment_transaction);
      Product.hasMany(models.Product_detail);
      Product.hasMany(models.Cart);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      photo: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.DECIMAL,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
