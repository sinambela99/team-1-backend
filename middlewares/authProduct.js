const { Product } = require("../models");

const authProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(+id);
    if (!product) {
      throw { name: "NotFound" };
    }
    if (product.UserId !== req.user.id || (req.user.role === "buyer" && req.user.role === "admin")) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authProduct;
