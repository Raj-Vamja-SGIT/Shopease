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
            loginWithGoogle: 'api/Auth/LoginWithGoogle',
            register: 'api/Auth/Register',
            forgotPassword: 'api/Auth/ForgotPassword',
            changePassword: 'api/Auth/ChangeUserPassword',
        },
        userProfile: {
            getUserProfile: 'api/UserProfile/GetUserProfile',
            updateUserProfile: 'api/UserProfile/UpdateUserProfile',
        },
        admin: {
            getUsers: 'api/Admin/GetUsers',
            addUser: 'api/Admin/AddUser',
            deleteUser: 'api/Admin/DeleteUser'
        },
        dashBoard: {
            getDashboardData: 'api/Admin/GetDashboardData',
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

    loginWithGoogle(idToken: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(idToken);
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.loginWithGoogle}`;
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

    forgotPassword(email: string, clientUrl: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({ email, clientUrl });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.forgotPassword}`;
        return this.http.post<any>(url, body, { headers });
    }

    changePassword(passwordDetails: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify(passwordDetails);
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

    getUsers(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getUsers}`;
        return this.http.get(url, { headers });
    }

    addUser(formData: FormData): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.addUser}`;
        return this.http.post<any>(url, formData);
    }

    deletUser(userId: any): Observable<any>{
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.deleteUser}?userId=${userId}`;
        return this.http.get(url, { headers });
    }

    getDashboardData(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.dashBoard.getDashboardData}`;
        return this.http.get(url, { headers });
    }
}
