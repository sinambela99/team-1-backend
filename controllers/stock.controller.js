const { Stock } = require("../models");

class Controller {
  static async getAllStocks(req, res, next) {
    try {
      const result = await Stock.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getStockById(req, res, next) {
    try {
      const result = await Stock.findByPk(req.params.id);

      if (!result) return res.status(400).json({ message: "Stock not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createNewProduct(req, res, next) {
    try {
      const { stock } = req.body;

      const data = await Stock.create({ stock });

      res
        .status(200)
        .json({ message: `New Stock with id ${data.id} created.` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateStock(req, res, next) {
    try {
      const { stock } = req.body;

      const data = await Stock.update(
        { stock },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `Stock with id ${req.params.id} updated` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteStock(req, res, next) {
    try {
      const data = await Stock.findByPk(req.params.id);

      if (!data) return res.status(404).json({ message: "Stock not found" });

      Stock.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Stock with id ${data.id} deleted` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
