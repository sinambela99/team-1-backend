const { Product_detail } = require("../models");

class Controller {
    static async getAllProduct_detail(req, res, next) {
      try {
        const result = await Product_detail.findAll();

        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    
    static async newProduct_detail(req, res, next) {
        try {
          const { ProductId, StockId, CategoryId } = req.body;
    
          const product_detail = await Product_detail.create({ ProductId, StockId, CategoryId });
    
          res.status(200).json({ message: `New Product_detail with id ${product_detail.id} created.` });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }    

    static async getProduct_detailById(req, res, next) {
      try {
        const result = await Product_detail.findByPk(req.params.id);
  
        if (!result) return res.status(400).json({ message: "Product_detail not found" });
  
        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async updateProduct_detail(req, res, next) {
      try {
        const { ProductId, StockId, CategoryId } = req.body;
  
        const product_detail = await Product_detail.update(
          { ProductId, StockId, CategoryId },
          { where: { id: req.params.id } }
        );
  
        res.status(200).json({ message: "Product_detail updated" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async deleteProduct_detail(req, res, next) {
      try {
        const product_detail = await Product_detail.findByPk(req.params.id);
  
        if (!product_detail) return res.status(404).json({ message: "Cart not found" });
  
        Product_detail.destroy({ where: { id: req.params.id } });
  
        res.status(200).json({ message: `Product_detail with id ${product_detail.id} deleted` });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  
  module.exports = Controller;