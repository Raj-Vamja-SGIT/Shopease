import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/demo/components/common/models/model';
import { CommonService } from 'src/app/demo/service/common.service';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    valCheck: string[] = ['remember'];
    UserName!: string;
    UserEmail!: string;
    Password!: string;
    loading: boolean = false;

    User: User = {
        UserName: '',
        UserEmail: '',
        Password: '',
    };

    constructor(
        public layoutService: LayoutService,
        public commonservice: CommonService,
        private toastr: ToastrMessageService,
        private tst: MessageService,
        private router: Router
    ) {}

    RegisterUser(registerForm: any) {
        this.loading = true;

        this.User.UserName = registerForm.form.value.UserName;
        this.User.UserEmail = registerForm.form.value.UserEmail;
        this.User.Password = registerForm.form.value.Password;

        this.commonservice.register(this.User).subscribe(
            (response) => {
                if (response.success) {
                    console.log('Register successful', response);
                    console.log(this.User);
                    this.toastr.success(
                        'Success',
                        'User Register successfully'
                    );
                    this.loading = true;

                    setTimeout(() => {
                        this.router.navigate(['auth/login']);
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
                    'Username ,Email or  password are incorrcet.'
                );
            }
        );
    }
}
