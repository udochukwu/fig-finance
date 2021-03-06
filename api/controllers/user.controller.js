import { createUser, login } from "../services/user.services";

class UserController {
  static async createUser(req, res, next) {
    try {
      const user = await createUser(req.body, res);
      return res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const response = await login(req.body, res);
      return res.status(200).json(response );

    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
