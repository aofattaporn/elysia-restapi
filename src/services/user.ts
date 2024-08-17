import { Database } from "bun:sqlite";
import { Auth } from "../models/auth";
import { UserAccount } from "../models/user";
import AuthError from "../errors/authError";

abstract class userService {
  private static db: Database = new Database("users.sqlite");

  // Function to find a user by email
  static async findUserByEmail(auth: UserAccount): Promise<UserAccount[]> {
    try {
      await this.db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, username TEXT)"
      );

      const query = `SELECT * FROM users WHERE email = '${auth.email}'`;
      const results = await this.db.query(query).all();

      return results as UserAccount[];
    } catch (error) {
      throw new AuthError(1899, "unauthorized xxxx");
    }
  }

  // Function to check if the provided authentication is valid
  static checkAuth(auth: UserAccount): boolean {
    const user = this.findUserByEmail(auth);
    return false;
  }

  // Function to create a new user
  static createUser(auth: UserAccount) {
    const query =
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
    this.db.run(query, [auth.email, auth.password, auth.username]);
  }

  static updateUser(auth: Auth) {}

  static deleteUser(auth: Auth) {}
}

export default userService;
