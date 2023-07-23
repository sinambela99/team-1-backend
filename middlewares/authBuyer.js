const authBuyer = async (req, res, next) => {
  try {
    if (req.user.role !== "buyer") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authBuyer;
