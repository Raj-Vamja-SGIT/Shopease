import { environment } from 'src/environments/environment';
import { EncryptionService } from './../demo/service/encryption.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { ToastrMessageService } from '../demo/service/toastr.service';
import { Router } from '@angular/router';
import { UserService } from '../demo/service/user.service';
import { CommonService } from '../demo/service/common.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `
            :host ::ng-deep .p-menubar-root-list {
                flex-wrap: wrap;
            }
            .custom-chip {
                display: flex;
                align-items: center;
                background-color: rgb(249 103 95 / 24%);
                border-radius: 19px;
                padding: 4px 6px;
                overflow: hidden;
                transition: width 0.3s ease-in-out;
                width: 40px;
                cursor: pointer;
            }
            .custom-chip {
                width: auto;
            }

            .custom-chip p-avatar {
                transition: transform 0.3s ease-in-out;
            }
            .chip-label {
                white-space: nowrap;
                transition: opacity 0.3s ease-in-out;
                margin-left: 8px;
                margin-right: 4px;
            }
            .avatar:hover {
                color: rgba(249, 103, 95, 0.77);
            }
            .custom-chip:hover .chip-label {
                opacity: 1;
            }
            .profile-img {
                height: 2rem;
                width: 2rem;
                border-radius: 50%;
                object-fit: cover;
                cursor: pointer;
            }

            .profile-image-container {
                text-align: center;
                margin: 10px 0;
            }
        `,
    ],
})
export class AppTopBarComponent {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    menuItems: MenuItem[] = [];
    hover: boolean = false;
    userName: any;
    avatarName: string;
    avatar: any;
    baseUrl: any = environment.avatarUrl;
    subValue: any;
    userId: any;

    constructor(
        public layoutService: LayoutService,
        public toastr: ToastrMessageService,
        public router: Router,
        public encryptionService: EncryptionService,
        public userService: UserService,
        private service: CommonService
    ) {
        this.userId =
            this.encryptionService.getDecryptedData('authData')?.userId;
        this.service.getUserProfileDetails(this.userId).subscribe((data) => {
            if (data.success) {
                this.userService.updateAvatar(data.data.avatar)
            }
        });

        userService.avatar$.subscribe((subValue) => {
            this.avatar = subValue;
        });
        this.menuItems = [
            {
                label: 'Account Info',
                icon: 'pi pi-fw pi-user',
                styleClass: 'custom-menu-item',
                command: () => this.onUserProfile(),
            },
            {
                separator: true,
            },
            {
                label: 'Sign out',
                icon: 'pi pi-fw pi-power-off',
                styleClass: 'custom-menu-item ',
                command: () => this.signOut(),
            },
        ];
    }

    ngOnInit(): void {
        this.userName =
            this.encryptionService.getDecryptedData('authData')?.userName;
        this.avatarName = this.userName
            ? this.userName.charAt(0).toUpperCase()
            : '';
    }

    onUserProfile() {
        this.router.navigate(['shopease/pages/user']);
    }

    signOut() {
        this.encryptionService.clearData('authData');
        this.toastr.success('Success', 'User logged out successfully.');
        this.router.navigate(['auth/login']);
        this.userService.updateAvatar('');
    }
}
