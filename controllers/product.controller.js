const { Product, User } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");
const { Op } = require("sequelize");

class Controller {
  static async getAllProduct(req, res, next) {
    try {
      const { page, size, search } = req.query;

      const options = {
        // limit: size,
        // offset: page * size,
        order: [["id", "ASC"]],
        include: [{ model: User, attributes: ["name"] }],
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

  static async newProduct(req, res, next) {
    try {
      console.log(req)

      // const { id } = req.user;
      const { name, description, price, discount, photo } = req.body;
      console.log(req.body)
      const product = await Product.create({
        name,
        description,
        photo: photo,
        price: +price,
        discount,
        // UserId: UserId,
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
          photo: photo,
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
