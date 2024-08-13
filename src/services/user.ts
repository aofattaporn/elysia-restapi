import { Auth } from "../models/auth";
import { User } from "../models/user";

abstract class userService {
  static getUser(): User[] {
    return [];
  }

  static createUser(auth: Auth) {}

  static updateUser(auth: Auth) {}

  static deleteUser(auth: Auth) {}
}

export default userService;
