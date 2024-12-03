import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
    public static BaseURL = environment.apiUrl;

    public apiUrl = {
        baseURL: ForgotpasswordService.BaseURL,
        auth: {
            ForgotPassword: 'api/Auth/ForgotPassword',
            
        },
    };

    constructor(private http: HttpClient,   
        private storageService:StorageService,
    ) {}

  forgotPassword(objData: any) : Observable<any>{
    this.storageService.clearLocalStorage()
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });
    const body = JSON.stringify(objData );
    const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.ForgotPassword}`;
    return this.http.post<any>(url, body, { headers });
  }
}
