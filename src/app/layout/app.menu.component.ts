import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { EncryptionService } from '../demo/service/encryption.service';
import { UserService } from '../demo/service/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    userRole: any;
    userRoleFromSub: any;

    constructor(
        public layoutService: LayoutService,
        private encryptionService: EncryptionService,
        public userService: UserService
    ) {}

    ngOnInit() {
        this.userRole =
            this.encryptionService.getDecryptedData('authData')?.userRole;
        if (this.userRole) {
            this.userService.getUserRole(this.userRole);
        }
        this.userService.userRole$.subscribe((subValue) => {
            this.userRoleFromSub = subValue;
        });
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['dashboard'],
                    },
                ],
            },
        ];

        if (this.userRole == 1) {
            this.model.push({
                label: 'User',
                items: [
                    {
                        label: 'User List',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['pages/users'],
                    },
                ],
            });
        }
    }
}
