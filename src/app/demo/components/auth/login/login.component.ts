import { Router } from '@angular/router';
import { CommonService } from './../../../service/common.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { EncryptionService } from 'src/app/demo/service/encryption.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            .txt-hover {
                color: #9aa9b3 !important;
                text-decoration: none;
            }

            .txt-hover:hover {
                color: #f96159 !important;
            }
        `,
    ],
    providers: [MessageService, ToastrMessageService],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    Password!: string;
    EmailId!: string;
    isLoading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService,
        private router: Router,
        private encryptionService: EncryptionService
    ) {
        this.toastr.error('Error!', 'Username or password are incorrcet.');
    }

    onLogin() {
        this.isLoading = true;
        this.service.login(this.EmailId, this.Password).subscribe(
            (response) => {
                if (response.success) {
                    const authData = {
                        token: response.data.accessToken.token,
                        userRole: response.data.userProfile.roleId,
                        userId: response.data.userProfile.userId,
                        userName: response.data.userProfile.userName,
                    };
                    this.encryptionService.setEncryptedData(
                        'authData',
                        authData
                    );
                    this.toastr.success(
                        'Success',
                        `Account successfully logged in with ${response.data.userProfile.userName} .`
                    );
                    this.isLoading = true;
                    setTimeout(() => {
                        this.router.navigate(['shopease/dashboard']);
                    }, 1200);
                } else {
                    this.toastr.error(
                        'Error!',
                        'Something went wrong, please try again later.'
                    );
                    this.isLoading = false;
                }
            },
            (error) => {
                this.toastr.error(
                    'Error!',
                    'Username or password are incorrcet.'
                );
                this.isLoading = false;
            }
        );
    }
}
