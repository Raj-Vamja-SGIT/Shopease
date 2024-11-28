import { Component } from '@angular/core';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ChangePasswordRequestModel } from '../../../common/models/model';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';

@Component({
    selector: 'app-change-password',
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
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
    isLoading: boolean = false;

    changePassword: ChangePasswordRequestModel = {
        UserEmail: '',
        Password: '',
        ConfirmPassword: '',
    };

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService,
        public userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.changePassword.UserEmail = params['email'];
        });
    }

    onUpdate(changePasswordForm: any) {
        this.isLoading = true;
        if (
            this.changePassword.Password == '' ||
            this.changePassword.ConfirmPassword == ''
        ) {
            this.toastr.error('Error', 'Please enter the password');
            this.isLoading = false;
            return;
        }
        if (
            this.changePassword.Password !== this.changePassword.ConfirmPassword
        ) {
            this.toastr.error('Error', 'Passwords do not match!');
            this.isLoading = false;
            return;
        }
        this.changePassword.Password = changePasswordForm.form.value.password;
        this.service.changePassword(this.changePassword).subscribe(
            (response) => {
                if (response.success) {
                    this.toastr.success('Success', response.message);
                    this.isLoading = false;
                    this.router.navigate(['auth/login']);
                } else {
                    this.toastr.error('Error', response.message);
                    this.isLoading = false;
                }
            },
            (error: any) => {
                this.toastr.error(error.error.message || 'An error occurred');
                this.isLoading = false;
            }
        );
    }
}
