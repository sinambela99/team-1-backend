const { Product, User, Product_detail, Stock, Category } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");
const { Op, Sequelize } = require("sequelize");

class Controller {
  static async getAllProduct(req, res, next) {
    try {
      const { page, size, search } = req.query;

      const options = {
        // limit: size,
        // offset: page * size,
        order: [["id", "ASC"]],
      };

      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const result = await Product.findAll(options);

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async highPrice(req, res, next) {
    try {
      const prod = await Product.findAll({
        order: [["price", "DESC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({ data: prod });
    } catch (err) {
      next(err);
    }
  }

  static async lowerPrice(req, res, next) {
    try {
      const prod = await Product.findAll({
        order: [["price", "ASC"]],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({ prod });
    } catch (err) {
      next(err);
    }
  }

  static async newProduct(req, res, next) {
    try {
      console.log(req);

      // const { id } = req.user;
      const { name, description, price, discount, photo, stock, CategoryId } = req.body;

      console.log(req.body.category);

      const product = await Product.create({
        name,
        description,
        photo,
        price: +price,
        discount,
        // UserId: +id,
      });

      const prodStock = await Stock.create({
        stock,
      });

      const detail = await Product_detail.create({
        ProductId: product.id,
        StockId: prodStock.id,
        CategoryId: CategoryId,
      });

      res.status(200).json({ message: `New Product with id ${product.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const result = await Product.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { name, description, price, discount, photo } = req.body;

      const product = await Product.update(
        {
          name,
          description,
          photo,
          price,
          discount,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `Product with id ${req.params.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        throw { name: "NotFound" };
      }

      Product.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Product with id ${product.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
