import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async get(key: string): Promise<any> {
    let value = localStorage.getItem(key);
    return JSON.parse(value!);
  }

  public getAll() {
    let data: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      data.push(JSON.parse(localStorage.getItem(localStorage.key(i)!) || '{}'))
    }
    return data;
  }

  public async delete(key: string): Promise<any> {
    localStorage.removeItem(key);

  }
}
