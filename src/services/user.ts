import { Database } from "bun:sqlite";
import { UserAccount } from "../models/user";
import AuthError from "../errors/authError";
import GlobalError from "../errors/globalError";
import { UserAccountRes } from "../models/response/userRes";

abstract class userService {
  private static db: Database = new Database("users.sqlite");

  static async initialDatabe() {
    try {
      await this.db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, username TEXT)"
      );
    } catch (error) {
      throw new GlobalError(1999, `can't execute SQL query: ${error}`);
    }
  }

  static async findAll(): Promise<UserAccount[]> {
    try {
      const query = `SELECT * FROM users`;
      const results = await this.db.query(query).all();

      return results as UserAccount[];
    } catch (error) {
      throw new AuthError(1999, `unauthorized ${error}`);
    }
  }

  static async createUser(auth: UserAccount) {
    try {
      const query =
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
      await this.db.run(query, [auth.email, auth.password, auth.username]);
    } catch (error) {
      throw new GlobalError(1999, `can't execute SQL query: ${error}`);
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
      throw new GlobalError(1999, `can't execute SQL query: ${error}`);
    }
  }

  static async findUserByEmail(auth: UserAccount): Promise<UserAccountRes[]> {
    try {
      const query = `SELECT * FROM users WHERE email = '${auth.email}'`;
      const results = await this.db.query(query).all();

      return results as UserAccount[];
    } catch (error) {
      throw new GlobalError(1999, `can't execute SQL query: ${error}`);
    }
  }

  static async checkEmailAndPassword(
    auth: UserAccount
  ): Promise<UserAccountRes[]> {
    try {
      const query = this.db.query(
        `SELECT * FROM users WHERE email = $email AND password = $password`
      );
      const results = query.all({
        $email: auth.email,
        $password: auth.password,
      });

      return results as UserAccountRes[];
    } catch (error) {
      throw new GlobalError(1999, `cant to execute sql query : ${error}`);
    }
  }

  static async deleteAll(): Promise<void> {
    try {
      const query = this.db.query(`DELETE FROM users`);
      const result = query.run();
    } catch (error) {
      throw new GlobalError(1999, `can't execute SQL query: ${error}`);
    }
  }
}

export default userService;
