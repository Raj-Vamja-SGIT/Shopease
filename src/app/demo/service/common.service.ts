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
            forgotPassword: 'api/Auth/ForgotPassword',
            changePassword: 'api/Auth/ChangePassword',
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

    forgotPassword(email: string, clientUrl: string) : Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({email, clientUrl});
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.forgotPassword}`;
        return this.http.post<any>(url, body, { headers });
      }

      changePassword(pswd: string, confirmPswd: string) : Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({pswd, confirmPswd});
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.changePassword}`;
        return this.http.post<any>(url, body, { headers });
      }

    getUserProfileDetails(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.userProfile.getUserProfile}?userId=${userId}`;
        return this.http.get(url, { headers });
    }

    updateUserProfile(formData: FormData): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.userProfile.updateUserProfile}`;
        return this.http.post<any>(url, formData);
    }
}
