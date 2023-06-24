const { Cart } = require("../models");

class Controller {
    static async getAllCart(req, res, next) {
      try {
        const result = await Cart.findAll();

        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    
    static async newCart(req, res, next) {
        try {
          const { quantity, UserId, ProductId } = req.body;
    
          const cart = await Cart.create({ quantity, UserId, ProductId });
    
          res.status(200).json({ message: `New Cart with id ${cart.id} created.` });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }    

    static async getCartById(req, res, next) {
      try {
        const result = await Cart.findByPk(req.params.id);
  
        if (!result) return res.status(400).json({ message: "Cart not found" });
  
        res.status(200).json({ data: result });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async updateCart(req, res, next) {
      try {
        const { quantity, UserId, ProductId } = req.body;
  
        const cart = await Cart.update(
          { quantity, UserId, ProductId },
          { where: { id: req.params.id } }
        );
  
        res.status(200).json({ message: "Cart updated" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  
    static async deleteCart(req, res, next) {
      try {
        const cart = await Cart.findByPk(req.params.id);
  
        if (!cart) return res.status(404).json({ message: "Cart not found" });
  
        Cart.destroy({ where: { id: req.params.id } });
  
        res.status(200).json({ message: `Cart with id ${cart.id} deleted` });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
  
  module.exports = Controller;