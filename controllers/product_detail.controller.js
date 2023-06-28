const { Product_detail } = require("../models");

class Controller {
  // Get All Product Details
  static async getAllProduct_detail(req, res, next) {
    try {
      const result = await Product_detail.findAll({ order: [["id", "ASC"]] });

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Get Product Details By Id
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

  // Create Product Detail
  static async newProduct_detail(req, res, next) {
    try {
      const { ProductId, StockId, CategoryId } = req.fields;

      const product_detail = await Product_detail.create({
        ProductId,
        StockId,
        CategoryId,
      });

      res.status(200).json({
        message: `New Product_detail with id ${product_detail.id} created.`,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update Product Detail
  static async updateProduct_detail(req, res, next) {
    try {
      const product_detail = await Product_detail.findByPk(req.params.id);

      if (!product_detail) {
        throw { name: "NotFound" };
      }

      const { ProductId, StockId, CategoryId } = req.body;

      Product_detail.update(
        { ProductId, StockId, CategoryId },
        { where: { id: req.params.id } }
      );

      res
        .status(200)
        .json({
          message: `Product_detail with id ${product_detail.id} updated`,
        });
    } catch (err) {
      next(err);
    }
  }

  // Delete Product Detail
  static async deleteProduct_detail(req, res, next) {
    try {
      const product_detail = await Product_detail.findByPk(req.params.id);

      if (!product_detail) {
        throw { name: "NotFound" };
      }

      Product_detail.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        message: `Product_detail with id ${product_detail.id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
