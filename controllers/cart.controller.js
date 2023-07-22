const { Cart, User, Product } = require("../models");

class Controller {
  static async getAllCart(req, res, next) {
    try {
      const result = await Cart.findAll({
        order: [["id", "ASC"]],
        include: [{ model: User }, { model: Product }],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getCartById(req, res, next) {
    try {
      const result = await Cart.findByPk(req.params.id, {
        order: [["id", "ASC"]],
        include: [{ model: User }, { model: Product }],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async newCart(req, res, next) {
    try {
      const { id } = req.user;
      const { quantity, ProductId } = req.body;
      // const product = await Product.findByPk();
      const cart = await Cart.create({
        quantity,
        UserId: +id,
        ProductId,
      });
      res.status(200).json({ message: `New Cart with id ${cart.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { quantity, UserId, ProductId } = req.fields;

      const cart = await Cart.update(
        {
          quantity,
          UserId,
          ProductId,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `Cart ${cart.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const cart = await Cart.findByPk(req.params.id);

      if (!cart) {
        throw { name: "NotFound" };
      }

      Cart.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Cart with id ${cart.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
