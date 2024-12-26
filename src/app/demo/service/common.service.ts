import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonService {
    public static readonly BaseURL = environment.apiUrl;

    public apiUrl = {
        baseURL: CommonService.BaseURL,
        auth: {
            login: 'api/Auth/Login',
            loginWithGoogle: 'api/Auth/LoginWithGoogle',
            register: 'api/Auth/Register',
            forgotPassword: 'api/Auth/ForgotPassword',
            changePassword: 'api/Auth/ChangeUserPassword',
            updateStatus: 'api/Auth/UpdateOnlineUserStatus',
        },
        userProfile: {
            getUserProfile: 'api/UserProfile/GetUserProfile',
            updateUserProfile: 'api/UserProfile/UpdateUserProfile',
        },
        admin: {
            getUsers: 'api/Admin/GetUsers',
            getProducts: 'api/Product/GetProducts',
            getBrands: 'api/Product/GetBrands',
            getCategories: 'api/Product/GetCategories',
            getProductDetails: 'api/Product/GetProductDetails',
            getSubcategories: 'api/Product/GetSubCategories',
            getSubcategoryDetails: 'api/Product/GetSubcategoryDetais',
            getProductImages: 'api/Product/GetProductImages',
            getLastMessages: 'api/Admin/GetLastMessages',

            addUser: 'api/Admin/AddUser',
            saveProduct: 'api/Product/AddUpdateProduct',
            addProductImage: 'api/Product/AddProductImages',
            updateImageOrder: 'api/Product/UpdateImageOrder',
            addUpdateSubcategory: 'api/Product/AddUpdateSubCategory',
            logOutTime: 'api/Admin/LogOutTime',

            deleteUser: 'api/Admin/DeleteUser',
            deleteMultiUser: 'api/Admin/DeleteMultiUser',
            deleteProductImage: 'api/Product/DeleteProductImage',
            deleteSubCategory: 'api/Product/DeleteSubCategory',
        },
        dashBoard: {
            getDashboardData: 'api/Admin/GetDashboardData',
        },
    };

    constructor(private readonly http: HttpClient) {}

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
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.addUser}`;
        return this.http.post<any>(url, formData);
    }

    deleteUser(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.deleteUser}?userId=${userId}`;
        return this.http.post(url, { headers });
    }

    deleteMultiUser(userIds: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const body = JSON.stringify({ userIds });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.deleteMultiUser}`;
        return this.http.post<any>(url, body, { headers });
    }

    getDashboardData(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.dashBoard.getDashboardData}`;
        return this.http.get(url, { headers });
    }

    getProducts(roleId: any, searchTerm: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        let url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getProducts}?Id=${roleId}`;
        if (searchTerm) {
            url += `&searchTerm=${searchTerm}`;
        }
        return this.http.get<any>(url, { headers });
    }

    getBrands(categoryId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getBrands}?categoryId=${categoryId}`;
        return this.http.get(url, { headers });
    }

    getCategories(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getCategories}`;
        return this.http.get(url, { headers });
    }

    getProductDetails(productId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getProductDetails}?productId=${productId}`;
        return this.http.get(url, { headers });
    }

    saveProduct(formData: FormData): Observable<any> {
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.saveProduct}`;
        return this.http.post<any>(url, formData);
    }

    addProductImage(formData: FormData): Observable<any> {
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.addProductImage}`;
        return this.http.post<any>(url, formData);
    }

    getProductImages(productId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getProductImages}?productId=${productId}`;
        return this.http.get<any>(url, { headers });
    }

    updateImageOrder(formData: FormData): Observable<any> {
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.updateImageOrder}`;
        return this.http.post<any>(url, formData);
    }

    deleteProductImage(id: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.deleteProductImage}?imageId=${id}`;
        return this.http.post(url, { headers });
    }

    getSubCategories(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getSubcategories}`;
        return this.http.get(url, { headers });
    }

    getSubCategoryDetails(subCategoryId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getSubcategoryDetails}?subCategoryId=${subCategoryId}`;
        return this.http.get(url, { headers });
    }

    addUpdateSubCategory(formData: FormData): Observable<any> {
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.addUpdateSubcategory}`;
        return this.http.post<any>(url, formData);
    }

    deleteSubCategory(subCategoryId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.deleteSubCategory}?subCategoryId=${subCategoryId}`;
        return this.http.post(url, { headers });
    }

    updateStatus(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.auth.updateStatus}?userId=${userId}`;
        return this.http.post(url, { headers });
    }

    logOutTime(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.logOutTime}?userId=${userId}`;
        return this.http.post(url, { headers });
    }

    getLastMessages(userId: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = `${this.apiUrl.baseURL}${this.apiUrl.admin.getLastMessages}?fromUserId=${userId}`;
        return this.http.post(url, { headers });
    }
}
