const { Product } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");

class Controller {
  static async getAllProduct(req, res, next) {
    try {
      const result = await Product.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async newProduct(req, res, next) {
    try {
      const uploadedFile = await cloudinaryConfig.uploader.upload(
        req.files.photo.path
      );

      const { name, description, price, discount, UserId } = req.fields;

      const product = await Product.create({
        name,
        description,
        photo: uploadedFile?.secure_url,
        price,
        discount,
        UserId,
      });

      res
        .status(200)
        .json({ message: `New Product with id ${product.id} created.` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProductById(req, res, next) {
    try {
      const result = await Product.findByPk(req.params.id);

      if (!result)
        return res.status(400).json({ message: "Product not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const uploadedFile = await cloudinaryConfig.uploader.upload(
        req.files.photo.path
      );

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

      res
        .status(200)
        .json({ message: `Product with id ${req.params.id} updated` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product)
        return res
          .status(404)
          .json({ message: `Product with id ${product.id} not found` });

      Product.destroy({ where: { id: req.params.id } });

      res
        .status(200)
        .json({ message: `Product with id ${product.id} deleted` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
