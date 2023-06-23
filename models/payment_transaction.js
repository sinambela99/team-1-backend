"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment_transaction.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      Payment_transaction.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      Payment_transaction.hasMany(models.Payment_transaction_detail);
    }
  }
  Payment_transaction.init(
    {
      payment_code: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      shipping_address: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      payment_status: DataTypes.STRING,
      delivery_status: DataTypes.STRING,
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment_transaction",
    }
  );
  return Payment_transaction;
};
