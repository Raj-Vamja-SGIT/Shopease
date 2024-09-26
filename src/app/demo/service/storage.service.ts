import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  userName = new Subject<string>();
  constructor(private commonService: CommonService) {}
  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  updateUserDetails(firstName: string | null, lastName: string | null) {
    if (firstName != null && lastName != null) {
      let userName = firstName + " " + lastName;
      // this.setValue(StorageKey.firstName, this.commonService.Encrypt(firstName));
      // this.setValue(StorageKey.lastName, this.commonService.Encrypt(lastName));
      this.userName.next(userName);
    }
  }

  clearLocalStorage() {
    this.removeValue(StorageKey.authToken);
    this.removeValue(StorageKey.currentUserId);
    this.removeValue(StorageKey.currentUser);
    this.removeValue(StorageKey.firstName);
    this.removeValue(StorageKey.lastName);
    this.removeValue(StorageKey.adminProfilePicture);
    this.removeValue(StorageKey.storeId);
    this.removeValue(StorageKey.authToken);
    this.removeValue(StorageKey.userfullname);
  }

}


export class StorageKey {
  public static currentUser = 'currentUser';
  public static userfullname = 'userfullname';
  public static authToken = 'authToken';
  public static currentUserId = 'currentUserId';
  public static adminProfilePicture = 'adminProfilePicture'
  public static storeId = 'storeId';
  public static firstName = 'firstName';
  public static lastName = 'lastName';
}
