const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { name, address, email, password, role } = req.fields;

      const user = await User.create({
        name,
        address,
        email,
        password,
        role,
      });

      res.status(200).json({ message: `New user with id ${user.id} created.` });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.fields;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({ statusCode: 200, access_token: token, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const result = await User.findAll();
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const result = await User.findByPk(req.params.id);
      if (!result) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { name, address, email, password, role } = req.body;

      const user = await User.update(
        {
          name,
          address,
          email,
          password,
          role,
        },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: `User id ${user.id} updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        throw { name: "NotFound" };
      }

      User.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `User with id ${user.id} deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
