const { Product } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");

class Controller {
  static async getAllProduct(req, res, next) {
    try {
      const result = await Product.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async newProduct(req, res, next) {
    try {
      const uploadedFile = await cloudinaryConfig.uploader.upload(req.files.photo.path);

      const { name, description, price, discount, UserId } = req.fields;

      const product = await Product.create({
        name,
        description,
        photo: uploadedFile?.secure_url,
        price,
        discount,
        UserId,
      });

      res.status(200).json({ message: `New Product with id ${product.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const result = await Product.findByPk(req.params.id);

      if (!result) return res.status(400).json({ message: "Product not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const uploadedFile = await cloudinaryConfig.uploader.upload(req.files.photo.path);

      const { name, description, price, discount, UserId } = req.fields;

      const product = await Product.update(
        {
          name,
          description,
          photo: uploadedFile?.secure_url,
          price,
          discount,
          UserId,
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
