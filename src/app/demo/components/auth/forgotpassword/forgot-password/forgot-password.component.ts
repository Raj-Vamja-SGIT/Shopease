import { Component } from '@angular/core';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
    isLoading: boolean = false;
    Email: string;
    ClientUrl: any;

    constructor(
        public layoutService: LayoutService,
        private toastr: ToastrMessageService,
        private service: CommonService
    ) {}

    ngOnInit(): void {}

    onForgotPassword() {
        this.isLoading = true;
        if (this.Email == '' || this.Email == undefined) {
            this.toastr.error('Error!', 'Please enter your email first!');
            this.isLoading = false;
            return;
        }
        this.ClientUrl = environment.PortalUrl + 'auth/change-password';
        this.service.forgotPassword(this.Email, this.ClientUrl).subscribe(
            (response) => {
                if (response.success) {
                    this.toastr.success('Success', response.message);
                    this.isLoading = false;
                } else {
                    this.toastr.error('Error!', response.message);
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
