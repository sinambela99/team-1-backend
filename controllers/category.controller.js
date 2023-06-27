const { Category } = require("../models");

class Controller {
  // Get All Category
  static async getAllCategory(req, res, next) {
    try {
      const result = await Category.findAll({ order: [["id", "ASC"]] });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Create Category
  static async newCategory(req, res, next) {
    try {
      const { name, description } = req.body;

      const category = await Category.create({ name, description });

      res
        .status(200)
        .json({ message: `New Category with id ${category.id} created.` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get Category By Id
  static async getCategoryById(req, res, next) {
    try {
      const result = await Category.findByPk(req.params.id);

      if (!result)
        return res.status(400).json({ message: "Category id not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update Category
  static async updateCategory(req, res, next) {
    try {
      const category = await Categorie.findByPk(req.params.id);

      if (!category) {
        res.status(404).json({
          message: `Category id not found`,
        });
      }

      const { name, description } = req.body;

      Category.update({ name, description }, { where: { id: req.params.id } });

      res
        .status(200)
        .json({ message: `Category with id ${category.id} updated` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete Category
  static async deleteCategory(req, res, next) {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category)
        return res.status(404).json({ message: "Category id not found" });

      Category.destroy({ where: { id: req.params.id } });

      res
        .status(200)
        .json({ message: `Category with id ${category.id} deleted` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
