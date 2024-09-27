import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

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
    Password!: string;
    ConfirmPassword!: string;

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService
    ) {}

    ngOnInit(): void {}

    onUpdate() {
        this.isLoading = true;
        if (this.Password == '' || this.ConfirmPassword == '') {
            this.toastr.error('Error', 'Please enter the password');
            this.isLoading = false;
            return;
        }
        if (this.Password !== this.ConfirmPassword) {
            this.toastr.error('Error', 'Passwords do not match!');
            this.isLoading = false;
            return;
        }

        this.service
            .changePassword(this.Password, this.ConfirmPassword)
            .subscribe(
                (response) => {
                    if (response.success) {
                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                    }
                },
                (error: any) => {
                    this.toastr.error(
                        error.error.message || 'An error occurred'
                    );
                    this.isLoading = false;
                }
            );
    }
}
