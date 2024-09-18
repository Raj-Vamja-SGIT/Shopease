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
    providers: [MessageService, ToastrMessageService]

})
export class LoginComponent {
    valCheck: string[] = ['remember'];
    password!: string;
    username!: string;

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService,
        private tst: MessageService
    ) {
        this.toastr.error('Error!', 'Username or password are incorrcet.');
    }
    
    onLogin() {
        this.service.login(this.username, this.password).subscribe(
            (response) => {
                console.log('Login successful', response);
            },
            (error) => {
                this.toastr.error(
                    'Error!',
                    'Username or password are incorrcet.'
                );
            }
        );
    }
}
