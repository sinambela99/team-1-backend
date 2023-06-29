const { Payment_transaction_detail } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");

class Controller {
  // Get All Payment Transaction Detail
  static async getAllPayTransDet(req, res, next) {
    try {
      const result = await Payment_transaction_detail.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Get Payment Transaction Detail By Id
  static async getPayTransDetById(req, res, next) {
    try {
      const result = await Payment_transaction_detail.findByPk(req.params.id);

      if (!result) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  // Create Payment Transaction Detail
  static async createNewPayTransDet(req, res, next) {
    try {
      const { shipment_number, PaymentTransactionId } = req.fields;

      const uploadedFile = await cloudinaryConfig.uploader.upload(
        req.files.receipt.path
      );

      const data = await Payment_transaction_detail.create({
        shipment_number,
        receipt: uploadedFile?.secure_url,
        PaymentTransactionId,
      });

      res.status(200).json({
        message: `New Payment Transaction Detail with id ${data.id} created.`,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update Payment Transaction Detail
  static async updatePayTransDet(req, res, next) {
    try {
      const data = await Payment_transaction_detail.findByPk(req.params.id);

      if (!data) {
        throw { name: "NotFound" };
      }

      const { shipment_number, PaymentTransactionId } = req.fields;

      const uploadedFile = await cloudinaryConfig.uploader.upload(
        req.files.receipt.path
      );

      Payment_transaction_detail.update(
        {
          shipment_number,
          receipt: uploadedFile?.secure_url,
          PaymentTransactionId,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({
        message: `Payment Transaction Detail with id ${req.params.id} updated`,
      });
    } catch (err) {
      next(err);
    }
  }

  // Delete Payment Transaction Detail
  static async deletePayTransDet(req, res, next) {
    try {
      const data = await Payment_transaction_detail.findByPk(req.params.id);

      if (!data) {
        throw { name: "NotFound" };
      }
      Payment_transaction_detail.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        message: `Payment Transaction Detail with id ${data.id} deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
