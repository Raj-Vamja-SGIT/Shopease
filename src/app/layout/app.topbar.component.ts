import { EncryptionService } from './../demo/service/encryption.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { ToastrMessageService } from '../demo/service/toastr.service';
import { Router } from '@angular/router';

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
            .custom-chip:hover {
                width: auto;
            }

            .custom-chip p-avatar {
                transition: transform 0.3s ease-in-out;
            }
            .chip-label {
                opacity: 0;
                white-space: nowrap;
                transition: opacity 0.3s ease-in-out;
                margin-left: 8px;
            }

            .custom-chip:hover .chip-label {
                opacity: 1;
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
    avtarName: string;

    constructor(
        public layoutService: LayoutService,
        public toastr: ToastrMessageService,
        public router: Router,
        public encryptionService: EncryptionService
    ) {
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
        // this.userName = JSON.parse(localStorage.getItem('AuthData'))?.userName;
        this.userName =
            this.encryptionService.getDecryptedData('authData')?.userName;
        this.avtarName = this.userName
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
    }
}
