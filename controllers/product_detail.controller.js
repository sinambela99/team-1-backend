const { Product_detail } = require("../models");

class Controller {
  static async getAllProduct_detail(req, res, next) {
    try {
      const result = await Product_detail.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async newProduct_detail(req, res, next) {
    try {
      const { ProductId, StockId, CategoryId } = req.fields;

      const product_detail = await Product_detail.create({
        ProductId,
        StockId,
        CategoryId,
      });

      res.status(200).json({ message: `New Product_detail with id ${product_detail.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async getProduct_detailById(req, res, next) {
    try {
      const result = await Product_detail.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct_detail(req, res, next) {
    try {
      const { ProductId, StockId, CategoryId } = req.body;

      const product_detail = await Product_detail.update({ ProductId, StockId, CategoryId }, { where: { id: req.params.id } });

      res.status(200).json({ message: "Product_detail updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct_detail(req, res, next) {
    try {
      const product_detail = await Product_detail.findByPk(req.params.id);

      if (!product_detail) {
        throw { name: "NotFound" };
      }

      Product_detail.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Product_detail with id ${product_detail.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
