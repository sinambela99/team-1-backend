"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Products",
          key: "id",
        },
      },
      StockId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Stocks",
          key: "id",
        },
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Categories",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_details");
  },
};
