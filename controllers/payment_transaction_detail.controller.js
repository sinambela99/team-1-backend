const { Payment_transaction_detail } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");

class Controller {
  static async getAllPayTransDet(req, res, next) {
    try {
      const result = await Payment_transaction_detail.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getPayTransDetById(req, res, next) {
    try {
      const result = await Payment_transaction_detail.findByPk(req.params.id);

      if (!result)
        return res
          .status(400)
          .json({ message: "Payment Transaction Detail not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

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
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updatePayTransDet(req, res, next) {
    try {
      const { shipment_number, PaymentTransactionId } = req.fields;

      const uploadedFile = await cloudinaryConfig.uploader.upload(
        req.files.receipt.path
      );

      const data = await Payment_transaction_detail.update(
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
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deletePayTransDet(req, res, next) {
    try {
      const data = await Payment_transaction_detail.findByPk(req.params.id);

      if (!data)
        return res
          .status(404)
          .json({ message: "Payment Transaction Detail not found" });

      Payment_transaction_detail.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        message: `Payment Transaction Detail with id ${data.id} deleted`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
