import { Router } from '@angular/router';
import { CommonService } from './../../../service/common.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
    loading: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService,
        private router: Router
    ) {
        this.toastr.error('Error!', 'Username or password are incorrcet.');
    }

    onLogin() {
        this.loading = true;
        this.service.login(this.EmailId, this.Password).subscribe(
            (response) => {
                if (response.success) {
                    localStorage.setItem(
                        'AuthToken',
                        response.data.accessToken.token
                    );
                    this.toastr.success(
                        'Success',
                        'User logged in successfully'
                    );
                    this.loading = true;
                    setTimeout(() => {
                        this.router.navigate(['home/dashboard']);
                    }, 1200);
                } else {
                    this.toastr.error(
                        'Error!',
                        'Something went wrong, please try again later.'
                    );
                    this.loading = false;
                }
            },
            (error) => {
                this.toastr.error(
                    'Error!',
                    'Username or password are incorrcet.'
                );
                this.loading = false;
            }
        );
    }
}
