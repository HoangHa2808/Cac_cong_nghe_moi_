import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly localStorageKey = 'accounts';
  private readonly localStorageAccountKey = 'account';
  private readonly loggedInKey = 'loggedIn';
  public accounts: Account[] = [];
  public account: Account | null = null;

  constructor(private storageService: StorageService) {
    this.addAccount('yourmail@gmail.com', '1234');
  }

  getAccount(email: string): any {
    return this.storageService.get(email);
  }

  // Lấy danh sách tài khoản
  async getAccounts(email: string): Promise<Account[]> {
    try {
      const response = await fetch('http://localhost/users');

      const resData = await response.json();

      // if (!response.ok) {
      //   throw new Error(resData.message || 'Fetching the accounts failed.');
      // }

      // return resData.accounts as Account[];

      return this.storageService.get(email);
    } catch (error) {
      console.error('Error:', error);
      console.log("server is down!!")
      return [];
    }
  }

  getCurrentAccount(): Promise<Account | null> {
    const accounts = this.storageService.get(this.localStorageAccountKey);

    console.log(typeof accounts);
    return accounts;
  }

  getAllAccount(): any {
    return this.storageService.getAll();
  }

  async login(email: string, password: string): Promise<boolean> {
    const accounts = await this.getAccounts(email);

    const foundAccount = accounts.some(
      (acc) => acc.email === email && acc.password === password
    );

    if (foundAccount) {
      await this.storageService.set(this.loggedInKey, 'true');
      this.account = {
        email: email,
        password: password,
        money: 100000,
      } as Account;
      await this.storageService.set(this.localStorageAccountKey, this.account);
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    this.account = null;
    await this.storageService.set(this.localStorageAccountKey, null);
    await this.storageService.set(this.loggedInKey, 'false');
  }

  // Thêm tài khoản mới
  async addAccount(email: string, password: string): Promise<any> {
    try {
      const response = await fetch('http://localhost/users', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the user failed.');
      }
      this.storageService.set(email, { email: email, password: password });
    } catch (err) {
      console.error('Error:', err);
      console.log("server is down!!")
    }
  }

  // Xoá tài khoản
  async deleteAccount(email: string): Promise<any> {
    try {
      const response = await fetch('http://localhost/users/' + email, {
        method: 'DELETE',
        
      });
      const resData = await response.json();
      console.log(response)
      console.log(resData)

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the user failed.');
      }
      return this.storageService.delete(email);
    } catch (err) {
      return false;
    }
   
  }
}
