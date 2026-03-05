import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return await this.logIn({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailSession({
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite :: getCurrentUser :: error", error);
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;