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
            login: 'api/login',
        },
    };

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({ username, password });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.login}`;
        return this.http.post<any>(url, body, { headers });
    }
}
