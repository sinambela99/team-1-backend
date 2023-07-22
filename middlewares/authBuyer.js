const authBuyer = async (req, res, next) => {
  try {
    if (req.user.role !== "buyer") next();
  } catch (err) {
    next(err);
  }
};

module.exports = authBuyer;
