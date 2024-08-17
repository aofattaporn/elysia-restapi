import { Database } from "bun:sqlite";
import { Auth } from "../models/auth";
import { UserAccount } from "../models/user";
import AuthError from "../errors/authError";
import GlobalError from "../errors/globalError";

abstract class userService {
  private static db: Database = new Database("users.sqlite");

  static async findAll(): Promise<UserAccount[]> {
    try {
      const query = `SELECT * FROM users`;
      const results = await this.db.query(query).all();

      return results as UserAccount[];
    } catch (error) {
      this.db.close(true);
      throw new AuthError(1999, `unauthorized ${error}`);
    }
  }

  static async initialDatabe() {
    try {
      await this.db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, username TEXT)"
      );
    } catch (error) {
      this.db.close(true);
      throw new GlobalError(1999, `cant to execute sql query : ${error}`);
    }
  }

  static async findById(id: number): Promise<UserAccount> {
    try {
      const query = `SELECT * FROM users WHERE id = ${id} LIMIT 1`; // Use a parameterized query
      const results = await this.db.query(query).all(); // Pass parameters as an array

      if (results.length === 0) {
        throw new GlobalError(1999, `not found data in database`);
      }
      return results[0] as UserAccount;
    } catch (error) {
      this.db.close(true);
      throw new GlobalError(1999, `cant to execute sql query : ${error}`);
    }
  }

  // Function to find a user by email
  static async findUserByEmail(auth: UserAccount): Promise<UserAccount[]> {
    try {
      const query = `SELECT * FROM users WHERE email = '${auth.email}'`;
      const results = await this.db.query(query).all();

      return results as UserAccount[];
    } catch (error) {
      this.db.close(true);
      throw new GlobalError(1999, `cant to execute sql query : ${error}`);
    }
  }

  // Function to check if the provided authentication is valid
  static checkAuth(auth: UserAccount): boolean {
    const user = this.findUserByEmail(auth);
    return false;
  }

  static updateUser(auth: Auth) {}

  static deleteUser(auth: Auth) {}
}

export default userService;
