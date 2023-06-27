const { Payment_transaction } = require("../models");

class Controller {
  static async getAllPayTrans(req, res, next) {
    try {
      const result = await Payment_transaction.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getPayTransById(req, res, next) {
    try {
      const result = await Payment_transaction.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async createNewPayTrans(req, res, next) {
    try {
      const { payment_code, quantity, total, shipping_address, payment_method, payment_status, delivery_status, ProductId, UserId } = req.fields;

      const data = await Payment_transaction.create({
        payment_code,
        quantity,
        total,
        shipping_address,
        payment_method,
        payment_status,
        delivery_status,
        ProductId,
        UserId,
      });

      res.status(200).json({
        message: `New Payment Transaction with id ${data.id} created.`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updatePayTrans(req, res, next) {
    try {
      const { payment_code, quantity, total, shipping_address, payment_method, payment_status, delivery_status, ProductId, UserId } = req.fields;

      const data = await Payment_transaction.update(
        {
          payment_code,
          quantity,
          total,
          shipping_address,
          payment_method,
          payment_status,
          delivery_status,
          ProductId,
          UserId,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `Payment Transaction with id ${req.params.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deletePayTrans(req, res, next) {
    try {
      const data = await Payment_transaction.findByPk(req.params.id);

      if (!data) {
        throw { name: "NotFound" };
      }

      Payment_transaction.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `Payment Transaction with id ${data.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
