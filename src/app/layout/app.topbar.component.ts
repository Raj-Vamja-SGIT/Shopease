import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';

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

    constructor(public layoutService: LayoutService) {
        this.menuItems = [
            {
                label: 'Account Info',
                icon: 'pi pi-fw pi-user',
                styleClass: 'custom-menu-item',
                command: () => this.signOut(),
            },
            {
                separator: true,
            },
            {
                label: 'Sign out',
                icon: 'pi pi-fw pi-power-off',
                styleClass: 'custom-menu-item ',
            },
        ];
    }

    signOut() {
        console.log('Signout!');
    }
}
