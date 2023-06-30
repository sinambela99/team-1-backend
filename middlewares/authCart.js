const { Cart } = require("../models");

const authCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByPk(+id);
    if (!cart) {
      throw { name: "NotFound" };
    }
    if (cart.UserId !== req.user.id || req.user.role === "seller") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authCart;
