import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private avatarSubject = new BehaviorSubject<string | null>(null);
    private userSubject = new BehaviorSubject<string | null>(null);
    private userRoleSubject = new BehaviorSubject<string | null>(null);

    avatar$ = this.avatarSubject.asObservable();
    userId$ = this.userSubject.asObservable();
    userRole$ = this.userRoleSubject.asObservable();

    updateAvatar(avatar: string | null) {
        this.avatarSubject.next(avatar);
    }
    getUserId(userId: string | null) {
        this.userSubject.next(userId);
    }
    getUserRole(userRole: any | null){
        this.userRoleSubject.next(userRole);
    }
}
