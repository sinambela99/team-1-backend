const { Category } = require("../models");

class Controller {
  // Get All Category
  static async getAllCategory(req, res, next) {
    try {
      const result = await Category.findAll({ order: [["id", "ASC"]] });

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Get Category By Id
  static async getCategoryById(req, res, next) {
    try {
      const result = await Category.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Create Category
  static async createNewCategory(req, res, next) {
    try {
      const { name, description } = req.fields;

      const category = await Category.create({ name, description });

      res
        .status(200)
        .json({ message: `New Category with id ${category.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  // Update Category
  static async updateCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        throw { name: "NotFound" };
      }

      const { name, description } = req.fields;

      Category.update({ name, description }, { where: { id: req.params.id } });

      res
        .status(200)
        .json({ message: `Category with id ${category.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  // Delete Category
  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        throw { name: "NotFound" };
      }

      Category.destroy({ where: { id: req.params.id } });

      res
        .status(200)
        .json({ message: `Category with id ${category.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
