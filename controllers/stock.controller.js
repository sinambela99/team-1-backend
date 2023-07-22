const { Stock } = require("../models");

class Controller {
  // Get All Stock
  static async getAllStocks(req, res, next) {
    try {
      const result = await Stock.findAll({ order: [["id", "ASC"]] });
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Get Stock By Id
  static async getStockById(req, res, next) {
    try {
      const result = await Stock.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Create Stock
  static async createNewProduct(req, res, next) {
    try {
      const { stock } = req.body;

      const data = await Stock.create({ stock });

      res.status(200).json({ message: `New Stock with id ${data.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  // Update Stock
  static async updateStock(req, res, next) {
    try {
      const data = await Stock.findByPk(req.params.id);

      if (!data) {
        throw { name: "NotFound" };
      }

      const { stock } = req.body;

      Stock.update({ stock }, { where: { id: req.params.id } });

      res.status(200).json({ message: `Stock with id ${req.params.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  // Delete Stock
  static async deleteStock(req, res, next) {
    try {
      const stock = await Stock.findByPk(req.params.id);

      if (!stock) {
        throw { name: "NotFound" };
      }

      Stock.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Stock with id ${stock.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
