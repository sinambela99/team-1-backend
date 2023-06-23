"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment_transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment_transaction_detail.belongsTo(models.Payment_transaction, {
        foreignKey: "PaymentTransactionId",
      });
    }
  }
  Payment_transaction_detail.init(
    {
      shipment_number: DataTypes.STRING,
      receipt: DataTypes.STRING,
      PaymentTransactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payment_transaction_detail",
    }
  );
  return Payment_transaction_detail;
};
