import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor() {
  }

  getStorageInstance() {
    return localStorage;
  }

  setStringStorage(key: string, value: any) {
    try {
      this.getStorageInstance().setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  }

  getStringStorage(key: string): any {
    try {
      return this.getStorageInstance().getItem(key);
    } catch (err) {
      console.log(err);
    }
  }

  setStorage(key: string, value: any) {
    try {
      let json = JSON.stringify(value);
      this.getStorageInstance().setItem(key, json);
    } catch (err) {
      console.log(err);
    }
  }

  getStorage(key: string): any {
    try {
      let data = this.getStorageInstance().getItem(key);
      if (data) {
        return JSON.parse(data);
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  clearStorage() {
    this.getStorageInstance().clear();
  }
}