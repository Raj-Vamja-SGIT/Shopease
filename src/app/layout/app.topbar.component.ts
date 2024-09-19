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
        `,
    ],
})
export class AppTopBarComponent {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    menuItems: MenuItem[] = [];

    constructor(
        public layoutService: LayoutService,
        public toastr: ToastrMessageService,
        public router: Router
    ) {
        this.menuItems = [
            {
                label: 'Account Info',
                icon: 'pi pi-fw pi-user',
                styleClass: 'custom-menu-item',
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

    signOut() {
        localStorage.removeItem('AuthToken');
        this.toastr.success('Success', 'User logged out successfully.');
        this.router.navigate(['auth/login']);
    }
}
