import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonService {
    public static BaseURL = environment.apiUrl;

    public apiUrl = {
        baseURL: CommonService.BaseURL,
        auth: {
            login: 'api/Auth/Login',
            register: 'api/Auth/Register',
        },
        userProfile: {
            getUserProfile: 'api/UserProfile/GetUserProfile',
            updateUserProfile: 'api/UserProfile/UpdateUserProfile',
        },
    };

    constructor(private http: HttpClient) {}

    login(EmailId: string, Password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({ EmailId, Password });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.login}`;
        return this.http.post<any>(url, body, { headers });
    }

    register(user: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(user);
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.register}`;
        return this.http.post<any>(url, body, { headers });
    }

    getUserProfileDetails(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({ userId });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.userProfile.getUserProfile}?userId=${userId}`;
        return this.http.get(url, { headers });
    }

    updateUserProfile(user: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(user);
        const url = `${this.apiUrl.baseURL}${this.apiUrl.userProfile.updateUserProfile}`;
        return this.http.post<any>(url, body, { headers });
    }
}
