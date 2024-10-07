import { Router } from '@angular/router';
import { CommonService } from './../../../service/common.service';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { EncryptionService } from 'src/app/demo/service/encryption.service';
import { environment } from 'src/environments/environment';
import { ExternalAuth } from '../../common/models/model';

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
            .error-messages {
                color: #f44336;
                font-size: 0.9em;
                margin-top: 3px;
            }
            .google-signin-button {
                display: flex;
                min-width: 420px !important;
                height: 51px;
                background-color: white;
                border: 0px solid #dcdcdc;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;
                border-radius: 6px;
            }
            .google-signin-button img {
                margin-right: 10px;
            }
            .divider-or {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px 0;
            }

            .divider-or hr {
                flex: 1;
                border: none;
                border-top: 1px solid #dcdcdc;
                margin: 0 10px;
            }

            .divider-or span {
                color: #aaa;
                font-size: 14px;
                white-space: nowrap;
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
    clientID: any = environment.clientID;
    
    externalAuth: ExternalAuth = {
        credential: '',
    };

    constructor(
        public layoutService: LayoutService,
        private service: CommonService,
        private toastr: ToastrMessageService,
        private router: Router,
        private encryptionService: EncryptionService,
        private ngZone: NgZone
    ) {
        this.loadGoogleApi().then(() => {
            this.initializeGoogleButton();
        });
    }

    ngOnInit(): void {
        
    }

    private loadGoogleApi(): Promise<void> {
        return new Promise((resolve) => {
            if (window['google'] && window['google'].accounts) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = 'https://accounts.google.com/gsi/client';
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    console.log('Google API script loaded');
                    resolve();
                };
                document.body.appendChild(script);
            }
        });
    }

    private initializeGoogleButton(): void {
        //@ts-ignore
        google.accounts.id.initialize({
            client_id: this.clientID,
            callback: this.handleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true,
        });

        const googleButton = document.getElementById('google');
        if (googleButton) {
            //@ts-ignore
            google.accounts.id.renderButton(googleButton, {
                theme: 'filled_blue',
                size: 'large',
                width: 450,
                shape: 'rectangular',
                text: 'signin_with',
                logo_alignment: 'left',
            });
        } else {
            console.error('Google button element not found');
        }
        //@ts-ignore
        google.accounts.id.prompt();
    }

    ngOnDestroy(): void {
        this.resetGoogleButton();
    }

    private resetGoogleButton(): void {
        const googleButton = document.getElementById('google');
        if (googleButton) {
            googleButton.innerHTML = ''; // Clear the button
        }
    }

    handleCredentialResponse(model: ExternalAuth) {
        this.service.loginWithGoogle(model.credential).subscribe(
            (response: any) => {
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
                        `Account successfully logged in with ${response.data.userProfile.userName}.`
                    );
                    this.isLoading = true;
                    this.ngZone.run(() => {
                        this.router.navigate(['shopease/dashboard']);
                    });
                } else {
                    this.toastr.error(
                        'Error!',
                        'Something went wrong, please try again later.'
                    );
                    this.isLoading = false;
                }
            },
            (error: any) => {
                this.toastr.error(error.message);
            }
        );
    }

    onLogin() {
        this.isLoading = true;
        if (this.EmailId == '' || this.Password == '') {
            this.toastr.error(
                'Error!',
                'Please enter your email and password correctly!'
            );
            this.isLoading = false;
            return;
        }
        this.service.login(this.EmailId, this.Password).subscribe(
            (response) => {
                if (response.success) {
                    const authData = {
                        token: response.data.accessToken.token,
                        userRole: response.data.userProfile.roleId,
                        userId: response.data.userProfile.userId,
                        userName: response.data.userProfile.userName,
                        avatar: response.data.userProfile.avatar,
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
                    }, 800);
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
