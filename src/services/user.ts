import { Auth } from "../models/auth";

abstract class userService {
  static getUser(): Auth[] {
    return [];
  }

  static findUserByEmail(auth: Auth): Auth[] {
    return [];
  }

  static checkAuth(auth: Auth): boolean {
    return true;
  }

  static createUser(auth: Auth) {}

  static updateUser(auth: Auth) {}

  static deleteUser(auth: Auth) {}
}

export default userService;
