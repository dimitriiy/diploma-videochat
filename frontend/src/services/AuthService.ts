import { HttpClient } from "@/services/HttpClient.ts";
import { User } from "@/models";
import { action, makeObservable, observable } from "mobx";

const KEY_USER = "user";
export class AuthService {
  public user: User | null = null;

  constructor() {
    makeObservable(this, { user: observable, setUser: action });

    this.init();
  }

  public async createTempUser({ name }: { name: string }) {
    try {
      const response = await HttpClient.post({ url: "/create-temp-user", data: { name: name, mail: null } });

      if (!response.data) {
        throw new Error("User is null");
      }

      this.user = response.data as User;

      this.setUser(this.user);
    } catch (e) {
      console.log("Error creating user");
    }
  }

  public setUser(user: User) {
    this.user = user;
    this.saveToStorage();
  }

  private init() {
    const user = localStorage.getItem(KEY_USER);
    if (user) {
      this.user = JSON.parse(user);
    }
  }
  private saveToStorage() {
    localStorage.setItem(KEY_USER, JSON.stringify(this.user));
  }
}

export const authService = new AuthService();
