"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_detail.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      Product_detail.belongsTo(models.Stock, {
        foreignKey: "StockId",
      });
      Product_detail.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
    }
  }
  Product_detail.init(
    {
      ProductId: DataTypes.INTEGER,
      StockId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_detail",
    }
  );
  return Product_detail;
};
