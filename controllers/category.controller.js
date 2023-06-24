const { Category } = require("../models");

class Controller {
    static async getAllCategory(req, res, next) {
      try {
        const result = await Category.findAll();

        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    
    static async newCategory(req, res, next) {
        try {
          const { name, description } = req.body;
    
          const category = await Category.create({ name, description });
    
          res.status(200).json({ message: `New Category with id ${category.id} created.` });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }    

    static async getCategoryById(req, res, next) {
      try {
        const result = await Category.findByPk(req.params.id);
  
        if (!result) return res.status(400).json({ message: "Category not found" });
  
        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async updateCategory(req, res, next) {
      try {
        const { quantity, UserId, ProductId } = req.body;
  
        const category = await Category.update(
          { quantity, UserId, ProductId },
          { where: { id: req.params.id } }
        );
  
        res.status(200).json({ message: "Category updated" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async deleteCategory(req, res, next) {
      try {
        const category = await Category.findByPk(req.params.id);
  
        if (!category) return res.status(404).json({ message: "Category not found" });
  
        Category.destroy({ where: { id: req.params.id } });
  
        res.status(200).json({ message: `Category with id ${category.id} deleted` });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  
  module.exports = Controller;