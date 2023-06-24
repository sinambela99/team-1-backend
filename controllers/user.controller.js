const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const result = await User.findAll();

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const result = await User.findByPk(req.params.id);

      if (!result) return res.status(400).json({ message: "User not found" });

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async register(req, res, next) {
    try {
      const { name, address, email, password, role } = req.body;

      const user = await User.create({ name, address, email, password, role });

      res.status(200).json({ message: `New user with id ${user.id} created.` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.json({ message: "Email required" });
      } else if (!password) {
        res.json({ message: "Password required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) return res.json({ message: "User not found" });

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) return res.json({ message: "Unauthorized" });

      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({ access_token: token, user_name: user.user_name });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { name, address, email, password, role } = req.body;

      const user = await User.update(
        { name, address, email, password, role },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: "User updated" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      User.destroy({ where: { id: req.params.id } });

      res.status(200).json({ message: `User with id ${user.id} deleted` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = Controller;
